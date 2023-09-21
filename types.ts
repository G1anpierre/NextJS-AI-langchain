import {z} from 'zod'

export const JournalUserSchema = z.object({
  journalId: z.string(),
  content: z.string(),
  createdAt: z.date(),
})

export const JournalsUserSchema = z.array(JournalUserSchema).optional()

export type JournalUserSchemaType = z.infer<typeof JournalUserSchema>
