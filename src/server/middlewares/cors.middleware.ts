import { envs } from '@src/config';
import cors from 'cors';

// List of accepted sources
const ACCEPTED_ORIGINS: string[] = [envs.ORIGIN];

// CORS middleware configured to accept only allowed origins
const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: { acceptedOrigins?: string[] } = {}) => {
  return cors({
    origin: (origin, callback) => {
      // Allows unsourced requests (e.g. from testing tools like Postman).
      if (!origin || acceptedOrigins.includes(origin)) return callback(null, origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  });
};

export default corsMiddleware;
