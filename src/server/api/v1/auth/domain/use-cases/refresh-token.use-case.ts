import { envs, expirationTimes } from '@src/config';
import { JwtAdapter } from '@src/shared/adapters';
import { CustomError } from '@src/shared/errors';
import { GenerateToken, ValidateToken } from '@src/shared/types/token';

import { SessionTokenDto } from '../dtos';
import { AuthRepository } from '../repositories';

interface RefreshTokenUseCase {
  execute(_sessionToken: Pick<SessionTokenDto, 'user_id' | 'refresh_token'>): Promise<any>;
}

class RefreshToken implements RefreshTokenUseCase {
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

  async execute(sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'refresh_token'>): Promise<any> {
    const { user_id, refresh_token } = sessionTokenDto;

    const isValid = await this.authRepository.isRefreshTokenValid({ user_id, refresh_token });
    if (!isValid) throw CustomError.unauthorized('Credenciales incorrectas');

    const payload = await this.validateToken(refresh_token, envs.JWT_REFRESH_SECRET_SEED);
    if (!payload) throw CustomError.unauthorized('Credenciales incorrectas');

    const newAccessToken = await this.generateToken({ id: payload.id.toString() }, expirationTimes['15_MINUTES']);
    if (!newAccessToken) throw CustomError.internalServerError('Error al realizar la autenticación');

    return newAccessToken;
  }
}

export default RefreshToken;
