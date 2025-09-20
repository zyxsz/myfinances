import { userSchema } from '@/users/domain/validators/user.validator';
import { createZodDto } from 'nestjs-zod';

const signInSchema = userSchema.pick({
  email: true,
  password: true,
});

export class SignInDto extends createZodDto(signInSchema) {}
