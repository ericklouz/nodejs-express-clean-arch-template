class UserEntity {
  public id: number;
  public names: string;
  public paternal_surname: string;
  public maternal_surname: string;
  public email: string;
  public password: string;
  public role: string[];
  public img?: string;

  constructor(
    id: number,
    names: string,
    paternal_surname: string,
    maternal_surname: string,
    email: string,
    password: string,
    role: string[],
    img?: string
  ) {
    this.id = id;
    this.names = names;
    this.paternal_surname = paternal_surname;
    this.maternal_surname = maternal_surname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.img = img;
  }
}

export default UserEntity;
