import { ErrorHandler } from '@src/shared/errors';

import { PasswordChangeSchema } from '../schemas';

class PasswordChangeDto {
  public password: string;
  public confirmedPassword: string;

  constructor(password: string, confirmedPassword: string) {
    this.password = password;
    this.confirmedPassword = confirmedPassword;
  }

  static create(object: { [key: string]: any }): [string?, PasswordChangeDto?] {
    const { error, data } = PasswordChangeSchema.safeParse(object);

    if (error) return [ErrorHandler.validate(error)];

    const { password, confirmed_password } = data;

    return [undefined, new PasswordChangeDto(password, confirmed_password)];
  }
}

export default PasswordChangeDto;
