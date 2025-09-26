import { profileSchema } from '@/profiles/domain/validators/profile.validator';
import { createZodDto } from 'nestjs-zod';

const updateProfileSchema = profileSchema
  .pick({ name: true, document: true, type: true })
  .partial();

export class UpdateProfileDto extends createZodDto(updateProfileSchema) {}
