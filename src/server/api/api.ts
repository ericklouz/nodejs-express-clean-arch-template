import { Response, Router } from 'express';

import { V1Routes } from './v1/v1';

export class ApiRoutes {
  static get routes(): Router {
    const api = Router();

    api.use('/v1', V1Routes.routes);
    api.get('/', (_, res: Response) => res.send('api is ready 👌'));

    return api;
  }
}
