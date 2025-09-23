import { userSchema } from '@/users/domain/validators/user.validator';
import { createZodDto } from 'nestjs-zod';

const schema = userSchema
  .pick({
    nickname: true,
    firstName: true,
    lastName: true,
  })
  .partial();

export class UpdateUserDto extends createZodDto(schema) {}
