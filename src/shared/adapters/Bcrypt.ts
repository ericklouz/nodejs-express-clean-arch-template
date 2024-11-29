import { compareSync, hashSync } from 'bcryptjs';

class BcryptAdapter {
  static hash(password: string): string {
    return hashSync(password);
  }

  static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}

export default BcryptAdapter;
