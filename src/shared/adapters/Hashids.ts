import { envs } from '@src/config';
import Hashids from 'hashids';

const HASHIDS_SECRET = envs.HASHIDS_SECRET;
const HASHIDS_MIN_LENGTH = envs.HASHIDS_MIN_LENGTH;

class HashidsAdapter {
  private static instance: Hashids;

  private static getInstance(): Hashids {
    if (!HashidsAdapter.instance) {
      HashidsAdapter.instance = new Hashids(HASHIDS_SECRET, HASHIDS_MIN_LENGTH);
    }
    return HashidsAdapter.instance;
  }

  static encodeId(id: number): string {
    const hashids = HashidsAdapter.getInstance();
    return hashids.encode(id);
  }

  static decodeId(hash: string): number | bigint | null {
    const hashids = HashidsAdapter.getInstance();
    const decoded = hashids.decode(hash);
    return decoded.length > 0 ? decoded[0] : null;
  }

  static encodeIds(ids: number[]): string {
    const hashids = HashidsAdapter.getInstance();
    return hashids.encode(ids);
  }

  static decodeIds(hash: string): (number | bigint)[] | null {
    const hashids = HashidsAdapter.getInstance();
    const decoded = hashids.decode(hash);
    return decoded.length > 0 ? decoded : null;
  }
}

export default HashidsAdapter;
