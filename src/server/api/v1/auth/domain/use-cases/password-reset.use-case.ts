import { envs, expirationTimes } from '@src/config';
import { JwtAdapter, NodemailerAdapter } from '@src/shared/adapters';
import { CustomError } from '@src/shared/errors';
import { AuthEmailTemplates } from '@src/shared/mails';
import { MailOptions, SendMail } from '@src/shared/types/mail';
import { GenerateToken } from '@src/shared/types/token';

import { UserEntity } from '../../../users/domain/entities';
import { AuthRepository } from '../repositories';

interface PasswordResetUseCase {
  execute(_email: string): Promise<any>;
}

class PasswordReset implements PasswordResetUseCase {
  private readonly authRepository: AuthRepository;
  private readonly generateToken: GenerateToken = JwtAdapter.generateToken;
  private readonly sendMail: SendMail;

  constructor(
    authRepository: AuthRepository,
    generateToken: GenerateToken = JwtAdapter.generateToken,
    sendMail: SendMail = new NodemailerAdapter().send
  ) {
    this.authRepository = authRepository;
    this.generateToken = generateToken;
    this.sendMail = sendMail;
  }

  async execute(email: string): Promise<any> {
    const user: UserEntity = await this.authRepository.passwordReset(email);
    const passwordChangeToken = await this.generateToken({ id: user.id.toString() }, expirationTimes['15_MINUTES']);

    if (!passwordChangeToken) throw CustomError.internalServerError('Error al enviar el correo');

    const userName = `${user.names} ${user.paternal_surname} ${user.maternal_surname ?? ''}`;

    const template: string = AuthEmailTemplates.PasswordRecovery(userName);

    const emailOptions: MailOptions = {
      from: envs.MAILERUSER,
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: template
    };

    await this.sendMail(emailOptions);

    return { passwordChangeToken };
  }
}

export default PasswordReset;
