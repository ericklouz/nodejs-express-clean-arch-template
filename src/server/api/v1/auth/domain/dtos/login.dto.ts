import { ErrorHandler } from '@src/shared/errors';

import { LoginUserSchema } from '../schemas';

class LoginDto {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { error, data } = LoginUserSchema.safeParse(object);

    if (error) return [ErrorHandler.validate(error)];

    const { email, password } = data;

    return [undefined, new LoginDto(email.toLowerCase(), password)];
  }
}

export default LoginDto;
