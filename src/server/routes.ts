import { Router } from 'express';

import { ApiRoutes } from './api/api';

export class AppRoutes {
  static get routes(): Router {
    const app = Router();

    app.use('/api', ApiRoutes.routes);
    app.get('/', (_, res) => res.send('app is online 👌'));

    return app;
  }
}
