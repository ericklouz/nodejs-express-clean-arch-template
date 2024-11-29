class RegisterUserDto {
  public names: string;
  public email: string;
  public password: string;
  public paternal_surname: string;

  private constructor(names: string, email: string, password: string, paternal_surname: string) {
    this.names = names;
    this.email = email;
    this.password = password;
    this.paternal_surname = paternal_surname;
  }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, paternal_surname } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];

    return [undefined, new RegisterUserDto(name, email.toLowerCase(), password, paternal_surname)];
  }
}

export default RegisterUserDto;
