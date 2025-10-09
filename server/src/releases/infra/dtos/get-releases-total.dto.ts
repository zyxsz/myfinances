import z from "zod";
import { periodSchema } from "./period.dto";
import { createZodDto } from "nestjs-zod";


const schema = z.object({
  type: z.enum(['INCOME', 'OUTCOME', 'INVESTMENT']),
  ...periodSchema.shape
})

export class GetReleasesTotalDto extends createZodDto(schema) {

}