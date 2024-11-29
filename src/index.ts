import { envs } from '@src/config';

import { PrismaDB } from './database/postgres/prisma';
import { AppRoutes } from './server/routes';
import { Server } from './server/server';

(() => {
  main();
})();

async function main() {
  try {
    await PrismaDB.connect();

    new Server({
      port: envs.PORT,
      routes: AppRoutes.routes
    }).start();
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1); // Exit the process with failure code
  }
}
