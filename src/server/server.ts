import { ServerOptions } from '@src/shared/types/api';
import cookieParser from 'cookie-parser';
import express, { Application, Router } from 'express';
import path from 'node:path';

import { corsMiddleware } from './middlewares';

export class Server {
  public readonly app: Application;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port, routes } = options;

    this.app = express();
    this.port = port;
    this.routes = routes;

    this.middlewares();
    this.apiRoutes();
  }

  middlewares() {
    // CORS
    this.app.use(corsMiddleware());

    // Body reading
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // x-powered-by
    this.app.disable('x-powered-by');

    this.app.set('trust proxy', true);

    this.app.use(cookieParser());

    // Public folders
    this.app.use('/images', express.static(path.join(__dirname, '../public/images')));
  }

  apiRoutes() {
    this.app.use(this.routes);
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
