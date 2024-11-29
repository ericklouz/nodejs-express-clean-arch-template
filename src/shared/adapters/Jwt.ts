import { envs } from '@src/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET_SEED = envs.JWT_SECRET_SEED;

class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: string | number,
    seed: string = JWT_SECRET_SEED
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, seed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string, seed: string = JWT_SECRET_SEED): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, seed, (err, decode) => {
        if (err) return resolve(null);
        resolve(decode as T);
      });
    });
  }
}

export default JwtAdapter;
