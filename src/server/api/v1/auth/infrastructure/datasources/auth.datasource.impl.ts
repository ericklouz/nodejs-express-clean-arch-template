import { expirationTimes } from '@src/config';
import { prisma } from '@src/database/postgres/prisma';
import { BcryptAdapter, JwtAdapter } from '@src/shared/adapters';
import { CustomError } from '@src/shared/errors';
import { GenerateToken } from '@src/shared/types/token';
import { GeolocationHandler } from '@src/shared/utils';
import { UserEntity } from '@v1/users/domain/entities';
import { UserMapper } from '@v1/users/infrastructure/mappers';

import { AuthDatasource } from '../../domain/datasources';
import { LoginDto, PasswordChangeDto, SessionTokenDto } from '../../domain/dtos';
import { SessionTokenEntity } from '../../domain/entities';

const usersDB = prisma.users;
const sessionTokensDB = prisma.session_tokens;
const loginHistoryDB = prisma.login_history;

type HashFunction = (_password: string) => string;
type CompareFunction = (_password: string, _hashed: string) => boolean;

class AuthDatasourceImpl implements AuthDatasource {
  private readonly hashPassword: HashFunction;
  private readonly comparePassword: CompareFunction;
  private readonly generateToken: GenerateToken = JwtAdapter.generateToken;

  constructor(
    hashPassword: HashFunction = BcryptAdapter.hash,
    comparePassword: CompareFunction = BcryptAdapter.compare,
    generateToken: GenerateToken = JwtAdapter.generateToken
  ) {
    this.comparePassword = comparePassword;
    this.hashPassword = hashPassword;
    this.generateToken = generateToken;
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;

    const user = await usersDB.findUnique({ where: { email } });
    if (!user) throw CustomError.badRequest('Usuario o contraseña incorrectos');

    const isMatching = this.comparePassword(password, user.password!);
    if (!isMatching) throw CustomError.badRequest('Usuario o contraseña incorrectos');

    return UserMapper.userEntityFromObject(user);
  }

  async saveRefreshToken(sessionTokenDto: SessionTokenDto): Promise<SessionTokenEntity> {
    const { user_id, refresh_token, refresh_token_expiration_date, ip_address, device_info } = sessionTokenDto;

    // Get the user's geolocation
    const { city, region, country } = await GeolocationHandler.get(ip_address);

    // Save the token to the database
    const refreshToken = await sessionTokensDB.create({
      data: {
        user_id,
        refresh_token,
        refresh_token_expiration_date,
        ip_address,
        device_info,
        city,
        region,
        country
      }
    });

    // Save login history
    await loginHistoryDB.create({
      data: {
        user_id,
        ip_address,
        device_info,
        city,
        region,
        country
      }
    });

    return refreshToken;
  }

  async isRefreshTokenValid(sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'refresh_token'>): Promise<boolean> {
    const { user_id, refresh_token } = sessionTokenDto;

    const storedRefreshToken = await sessionTokensDB.findFirst({
      where: { user_id, enable: true },
      orderBy: { id: 'desc' }
    });

    if (!storedRefreshToken || storedRefreshToken.refresh_token !== refresh_token) return false;
    if (storedRefreshToken.refresh_token_expiration_date < new Date()) return false;
    return true;
  }

  async logout(sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'ip_address' | 'device_info'>): Promise<any> {
    const { user_id, ip_address, device_info } = sessionTokenDto;
    // Deshabilitar todos los tokens del usuario
    await sessionTokensDB.updateMany({
      where: { user_id },
      data: { enable: false }
    });

    // Get the user's geolocation
    const { city, region, country } = await GeolocationHandler.get(ip_address);

    // Record the logout action in history
    await loginHistoryDB.create({
      data: {
        user_id,
        ip_address,
        device_info,
        city,
        region,
        country,
        action: 'LOGOUT'
      }
    });
  }

  async passwordReset(email: string): Promise<any> {
    const user = await usersDB.findUnique({ where: { email } });
    if (!user) throw CustomError.badRequest('No fue posible enviar el correo electrónico, intentelo de nuevo');

    const passwordChangeToken = await this.generateToken({ id: user.id.toString() }, expirationTimes['15_MINUTES']);

    const updatedUser = await usersDB.update({
      where: {
        id: user.id
      },
      data: {
        password_change_token: passwordChangeToken,
        password_change_token_expiration_date: new Date(Date.now() + expirationTimes['15_MINUTES'])
      }
    });

    return UserMapper.userEntityFromObject(updatedUser);
  }

  async passwordChange(passwordChangeDto: PasswordChangeDto, userId: string): Promise<UserEntity> {
    const { password, confirmedPassword } = passwordChangeDto;

    const user = await usersDB.findUnique({ where: { id: BigInt(userId) } });
    if (!user) throw CustomError.badRequest('No es posible actualizar la contraseña');

    if (password !== confirmedPassword) throw CustomError.badRequest('Las contraseñas no coinciden');

    const encryptedPassword = this.hashPassword(password);

    const updatedUser = await usersDB.update({
      where: { id: BigInt(userId) },
      data: { password: encryptedPassword, password_change_token: null, password_change_token_expiration_date: null }
    });

    return UserMapper.userEntityFromObject(updatedUser);
  }

  // async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
  //   const { name, email, password, paternal_surnmae, branch_office_id, created_by } =
  //     registerUserDto;
  //   try {
  //     //todo: Verificar corre
  //     const emailExists = await userDB.findUnique({
  //       where: { email: email.toLocaleLowerCase() }
  //     });

  //     if (emailExists) throw CustomError.badRequest('User already exists');

  //     const newUser = await userDB.create({
  //       data: {
  //         name,
  //         email,
  //         password,
  //         paternal_surnmae,
  //         branch_office_id,
  //         created_by
  //       }
  //     });

  //     //todo: Hash contraseña

  //     //todo: Mapear respuesta
  //     return UserMapper.userEntityFromObject(newUser);
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw CustomError.internalServer();
  //   }
  // }
}

export default AuthDatasourceImpl;
