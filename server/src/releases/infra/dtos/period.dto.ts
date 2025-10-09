import { createZodDto } from "nestjs-zod";
import z from "zod";


export const periodSchema = z.object({
  period: z.coerce.number().pipe(z.union([z.literal(30), z.literal(60), z.literal(90), z.literal(180)])).optional()
})

export class PeriodDto extends createZodDto(periodSchema) { }