import dotenv from 'dotenv';
import { get } from 'env-var';
import path from 'node:path';

// Load the corresponding .env file based on the environment
const environment = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, `../../.env.${environment}`) });

const envs = {
  PORT: get('PORT').required().asPortNumber(),

  ORIGIN: get('ORIGIN').required().asString(),

  JWT_SECRET_SEED: get('JWT_SECRET_SEED').required().asString(),
  JWT_REFRESH_SECRET_SEED: get('JWT_REFRESH_SECRET_SEED').required().asString(),

  HASHIDS_SECRET: get('HASHIDS_SECRET').required().asString(),
  HASHIDS_MIN_LENGTH: get('HASHIDS_MIN_LENGTH').required().asIntPositive(),

  NODE_ENV: get('NODE_ENV').required().asString(),

  IP_INFO_TOKEN: get('IP_INFO_TOKEN').required().asString(),

  MAILERHOST: get('MAILERHOST').required().asString(),
  MAILERPORT: get('MAILERPORT').required().asPortNumber(),
  MAILERUSER: get('MAILERUSER').required().asString(),
  MAILERPASS: get('MAILERPASS').required().asString()
};

export default envs;
