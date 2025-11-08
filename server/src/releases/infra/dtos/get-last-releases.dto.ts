import z from "zod";
import { createZodDto } from "nestjs-zod";


const schema = z.object({
  rangeStartAt: z.coerce.date(),
  rangeEndAt: z.coerce.date(),
})

export class GetLastReleasesDto extends createZodDto(schema) {

}