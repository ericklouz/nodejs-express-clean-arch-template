import { envs } from '@src/config';
import { TransporterOptions, MailSender } from '@src/shared/types/mail';
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

class NodemailerAdapter implements MailSender {
  public readonly transporter: Transporter;
  public readonly transporterOptions: TransporterOptions | undefined;

  constructor(options?: TransporterOptions) {
    const defaultOptions: TransporterOptions = {
      host: envs.MAILERHOST,
      port: envs.MAILERPORT,
      secure: false,
      auth: {
        user: envs.MAILERUSER,
        pass: envs.MAILERPASS
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: envs.NODE_ENV === 'development',
      logger: envs.NODE_ENV === 'development'
    };
    this.transporterOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
    this.transporter = nodemailer.createTransport(this.transporterOptions);

    this.send = this.send.bind(this);
  }

  async send(options: MailOptions): Promise<void> {
    const { to } = options;
    const mapOptions: MailOptions = { ...options, to: Array.isArray(to) ? to.join(', ') : to };

    await this.transporter.verify();
    await this.transporter.sendMail(mapOptions);
  }
}

export default NodemailerAdapter;
