import { envs, expirationTimes } from '@src/config';
import { JwtAdapter } from '@src/shared/adapters';
import { CustomError } from '@src/shared/errors';
import { GenerateToken, ValidateToken } from '@src/shared/types/token';

import { PasswordChangeDto } from '../dtos';
import { AuthRepository } from '../repositories';

interface UserToken {
  token: string;
  user: {
    id: string;
    names: string;
    email: string;
  };
}

interface PasswordChangeUseCase {
  execute(
    _passwordChangeDto: PasswordChangeDto,
    _passwordChangeToken: string,
    _ipAddress: string,
    _deviceInfo: string
  ): Promise<UserToken>;
}

class PasswordChange implements PasswordChangeUseCase {
  private readonly authRepository: AuthRepository;
  private readonly generateToken: GenerateToken = JwtAdapter.generateToken;
  private readonly validateToken: ValidateToken<{ id: string }> = JwtAdapter.validateToken;

  constructor(
    authRepository: AuthRepository,
    generateToken: GenerateToken = JwtAdapter.generateToken,
    validateToken: ValidateToken<{ id: string }> = JwtAdapter.validateToken
  ) {
    this.authRepository = authRepository;
    this.generateToken = generateToken;
    this.validateToken = validateToken;
  }

  async execute(
    passwordChangeDto: PasswordChangeDto,
    passwordChangeToken: string,
    ipAddress: string,
    deviceInfo: string
  ): Promise<any> {
    const payload = await this.validateToken(passwordChangeToken);
    if (!payload) throw CustomError.unauthorized('Credenciales incorrectas');

    const user = await this.authRepository.passwordChange(passwordChangeDto, payload.id);

    const refreshToken = await this.generateToken(
      { id: user.id.toString() },
      expirationTimes['30_DAYS'],
      envs.JWT_REFRESH_SECRET_SEED
    );
    if (!refreshToken) throw CustomError.internalServerError('Error al realizar la autenticación');

    await this.authRepository.saveRefreshToken({
      user_id: BigInt(user.id),
      refresh_token: refreshToken,
      refresh_token_expiration_date: new Date(Date.now() + expirationTimes['30_DAYS']),
      ip_address: ipAddress,
      device_info: deviceInfo
    });

    return {
      refreshToken,
      user: {
        id: user.id,
        names: user.names,
        paternal_surname: user.paternal_surname,
        maternal_surname: user.maternal_surname,
        email: user.email
      }
    };
  }
}

export default PasswordChange;
