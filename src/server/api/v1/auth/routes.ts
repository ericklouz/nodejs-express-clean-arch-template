import { AuthMiddleware } from '@src/server/middlewares';
import { Router } from 'express';

import { AuthDatasourceImpl } from './infrastructure/datasources';
import { AuthRepositoryImpl } from './infrastructure/repositories';
import { AuthController } from './presentation/controllers';

class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authDatasourceImpl = new AuthDatasourceImpl();
    const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceImpl);
    const controller = new AuthController(authRepositoryImpl);

    router.post('/login', controller.login);
    router.get('/refresh', AuthMiddleware.requireRefreshToken, controller.refreshToken);
    // router.post('/register', controller.registerUser);
    router.get('/protected', AuthMiddleware.validateAuth, controller.protected);
    router.get('/logout', AuthMiddleware.requireRefreshToken, controller.logout);
    router.post('/password-reset', controller.passwordReset);
    router.post('/password-change', controller.passwordChange);

    return router;
  }
}

export default AuthRoutes;
