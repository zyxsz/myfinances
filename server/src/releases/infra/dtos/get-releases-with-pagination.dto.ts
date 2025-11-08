import { createZodDto } from "nestjs-zod";
import z from "zod";


const paginationSchema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(2).max(99)
})

export class GetReleasesWithPaginationDto extends createZodDto(paginationSchema) { }