import { envs } from '@src/config';
import { prisma } from '@src/database/postgres/prisma';
import { JwtAdapter } from '@src/shared/adapters';
import { CustomError, ErrorHandler } from '@src/shared/errors';
import { ResponseHandler } from '@src/shared/utils';
import { NextFunction, Request, Response } from 'express';

const userDB = prisma.users;

class AuthMiddleware {
  static async validateAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');

    if (!authorization) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');
    if (!authorization?.startsWith('Bearer ')) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');

    const token: string | undefined = authorization.split(' ').at(1);
    if (!token) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');

      const user = await userDB.findUnique({
        where: { id: BigInt(payload.id) }
      });

      if (!user) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');

      req.body.user = user;

      next();
    } catch (error) {
      if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
      ResponseHandler.send(res, 500, ErrorHandler.validate(error));
    }

    next();
  }

  static async requireRefreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.['refresh-token'];
    if (!refreshToken) return ResponseHandler.send(res, 401, 'Usuario no logueado');

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(refreshToken, envs.JWT_REFRESH_SECRET_SEED);
      if (!payload) return ResponseHandler.send(res, 401, 'Credenciales incorrectas');

      req.params.user_id = payload.id;
      req.params.refresh_token = refreshToken;

      next();
    } catch (error) {
      if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
      ResponseHandler.send(res, 500, ErrorHandler.validate(error));
    }
  }
}

export default AuthMiddleware;
