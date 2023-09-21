import {Editor} from '@/components/Editor'
import {getUserByCleckID} from '@/utils/auth'
import {prisma} from '@/utils/db'
import React from 'react'
import {z} from 'zod'

export const JournalEntryAnalisisSchema = z.object({
  mood: z.string(),
  summary: z.string(),
  color: z.string(),
  subject: z.string(),
  negative: z.boolean(),
  sentimentScore: z.number(),
})

const JournalEntrySchema = z.object({
  journalId: z.string(),
  content: z.string(),
  analisis: JournalEntryAnalisisSchema,
})

export type JournalEntryType = z.infer<typeof JournalEntrySchema>

const getEntry = async (journalId: string) => {
  const user = await getUserByCleckID()
  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      creatorUserId: user?.userId,
      journalId,
    },
    include: {
      analisis: true,
    },
  })
  const validateJournalEntry = JournalEntrySchema.parse(journalEntry)
  return validateJournalEntry
}

const JournalDetails = async ({params}: {params: {journalId: string}}) => {
  const journalEntry = await getEntry(params.journalId)

  return <Editor journnalEntry={journalEntry} />
}

export default JournalDetails
