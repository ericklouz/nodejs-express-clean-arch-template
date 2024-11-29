import { UserEntity } from '../../domain/entities';

class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, names, paternal_surname, maternal_surname, email, password, role } = object;
    if (!names) throw new Error('Error mapper');

    return new UserEntity(id, names, paternal_surname, maternal_surname, email, password, role);
  }
}

export default UserMapper;
