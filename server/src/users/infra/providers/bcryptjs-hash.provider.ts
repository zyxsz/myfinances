import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { compare, hash } from 'bcryptjs';

export class BcryptJsHashProvider implements HashProvider {
  compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }

  hash(payload: string): Promise<string> {
    return hash(payload, 12);
  }
}
