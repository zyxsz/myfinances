import { userSchema } from '@/users/domain/validators/user.validator';
import { createZodDto } from 'nestjs-zod';

const signupSchema = userSchema;

export class SignupDto extends createZodDto(signupSchema) {}
