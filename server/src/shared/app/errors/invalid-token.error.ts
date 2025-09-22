import { BaseError } from '@/shared/domain/errors/base.error';

export class InvalidTokenError extends BaseError {
  constructor(message?: string) {
    super(message || 'Invalid token error', 'invalid-token');
  }
}
