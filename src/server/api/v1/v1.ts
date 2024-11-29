import { Response, Router } from 'express';

import AuthRoutes from './auth/routes';

export class V1Routes {
  static get routes(): Router {
    const v1 = Router();

    v1.use('/auth', AuthRoutes.routes);
    v1.get('/', (_, res: Response) => res.send('Welcome to v1!'));

    return v1;
  }
}
