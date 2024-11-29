import { ExpirationTimes } from '@src/shared/types/api';

const expirationTimes: ExpirationTimes = {
  '15_MINUTES': 15 * 60 * 1000,
  '30_MINUTES': 15 * 60 * 1000,
  '1_HOUR': 1 * 60 * 60 * 1000,
  '1_DAY': 24 * 60 * 60 * 1000,
  '30_DAYS': 30 * 24 * 60 * 60 * 1000
};

export default expirationTimes;
