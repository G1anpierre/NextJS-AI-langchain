import {z} from 'zod'


export const JournalEntryAnalisisSchema = z.object({
    mood: z.string(),
    summary: z.string(),
    color: z.string(),
    subject: z.string(),
    negative: z.boolean(),
    sentimentScore: z.number(),
});
  
export const JournalEntrySchema = z.object({
    journalId: z.string(),
    content: z.string(),
    analisis: JournalEntryAnalisisSchema,
});

export type JournalEntryType = z.infer<typeof JournalEntrySchema>
