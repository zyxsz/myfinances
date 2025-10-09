import { releaseSchema } from "@/releases/domain/validators/release.validator";
import { createZodDto } from "nestjs-zod";


const updateReleaseSchema = releaseSchema.pick({
  name: true,
  description: true,
  valueInCents: true,
  type: true,
  madeAt: true,
}).partial()

export class UpdateReleaseDto extends createZodDto(updateReleaseSchema) { }