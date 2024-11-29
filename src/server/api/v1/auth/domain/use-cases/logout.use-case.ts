import { SessionTokenDto } from '../dtos';
import { AuthRepository } from '../repositories';

interface LogoutUseCase {
  execute(_sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'ip_address' | 'device_info'>): Promise<any>;
}

class Logout implements LogoutUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(sessionTokenDto: Pick<SessionTokenDto, 'user_id' | 'ip_address' | 'device_info'>): Promise<any> {
    await this.authRepository.logout(sessionTokenDto);
  }
}

export default Logout;
