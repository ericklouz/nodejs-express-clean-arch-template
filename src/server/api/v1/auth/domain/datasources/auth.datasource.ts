import { UserEntity } from '../../../users/domain/entities';
import { LoginDto, PasswordChangeDto, SessionTokenDto } from '../dtos';
import { SessionTokenEntity } from '../entities';

abstract class AuthDatasource {
  abstract login(_loginDto: LoginDto): Promise<UserEntity>;
  abstract saveRefreshToken(_sessionTokenDto: SessionTokenDto): Promise<SessionTokenEntity>;
  abstract isRefreshTokenValid(_sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'refresh_token'>): Promise<boolean>;
  abstract logout(_sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'ip_address' | 'device_info'>): Promise<any>;
  abstract passwordReset(_email: string): Promise<any>;
  abstract passwordChange(_passwordChangeDto: PasswordChangeDto, _userId: string): Promise<UserEntity>;
  // abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}

export default AuthDatasource;
