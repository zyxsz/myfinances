import { releaseSchema } from "@/releases/domain/validators/release.validator";
import { createZodDto } from "nestjs-zod";


const createReleaseSchema = releaseSchema.pick({
  name: true,
  description: true,
  valueInCents: true,
  type: true,
  madeAt: true,
})

export class CreateReleaseDto extends createZodDto(createReleaseSchema) { }