import { UserEntity } from '@v1/users/domain/entities';

import { AuthDatasource } from '../../domain/datasources';
import { LoginDto, PasswordChangeDto, SessionTokenDto } from '../../domain/dtos';
import { SessionTokenEntity } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories';

class AuthRepositoryImpl implements AuthRepository {
  private readonly authDatasource: AuthDatasource;

  constructor(authDatasource: AuthDatasource) {
    this.authDatasource = authDatasource;
  }

  login(loginDto: LoginDto): Promise<UserEntity> {
    return this.authDatasource.login(loginDto);
  }

  saveRefreshToken(sessionTokenDto: SessionTokenDto): Promise<SessionTokenEntity> {
    return this.authDatasource.saveRefreshToken(sessionTokenDto);
  }

  isRefreshTokenValid(sessionTokenDto: SessionTokenDto): Promise<boolean> {
    return this.authDatasource.isRefreshTokenValid(sessionTokenDto);
  }

  logout(sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'ip_address' | 'device_info'>): Promise<any> {
    return this.authDatasource.logout(sessionTokenDto);
  }

  passwordReset(email: string): Promise<any> {
    return this.authDatasource.passwordReset(email);
  }

  passwordChange(passwordChangeDto: PasswordChangeDto, userId: string): Promise<UserEntity> {
    return this.authDatasource.passwordChange(passwordChangeDto, userId);
  }

  // register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
  //   return this.authDatasource.register(registerUserDto);
  // }
}

export default AuthRepositoryImpl;
