import { profileSchema } from '@/profiles/domain/validators/profile.validator';
import { createZodDto } from 'nestjs-zod';

const createProfileSchema = profileSchema.pick({
  name: true,
  type: true,
  document: true,
});

export class CreateProfileDto extends createZodDto(createProfileSchema) {}
