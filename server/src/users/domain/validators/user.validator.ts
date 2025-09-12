import { SchemaValidator } from '@/shared/domain/validators/schema-validator';
import z from 'zod';

export const userSchema = z.object({
  email: z.email(),
  nickname: z.string().min(2).max(32).nullable(),
  firstName: z.string().min(3).max(128),
  lastName: z.string().min(3).max(128),
  password: z.string().min(6).max(128),
});

export class UserValidator extends SchemaValidator {
  validate(data: z.infer<typeof userSchema>) {
    return super.validateSchema(data, userSchema);
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
