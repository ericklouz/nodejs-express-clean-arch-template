export interface MailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  attachments?: any;
}

export interface MailSender {
  send(_options: MailOptions): Promise<void>;
}

export type SendMail = (_options: MailOptions) => Promise<void>;
