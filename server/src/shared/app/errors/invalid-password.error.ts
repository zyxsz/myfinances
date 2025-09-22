import { BaseError } from '@/shared/domain/errors/base.error';

export class InvalidPasswordError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Invalid password', 'invalid-password');
  }
}
