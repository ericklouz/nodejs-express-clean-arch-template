import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrismaDB {
  static async connect() {
    try {
      await prisma.$connect();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
}

export { PrismaDB, prisma };
