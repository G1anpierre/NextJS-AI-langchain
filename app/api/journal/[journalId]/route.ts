import {JournalEntryAnalisisSchema} from '@/app/(dashboard)/journal/[journalId]/page'
import {analyze} from '@/utils/ai'
import {getUserByCleckID} from '@/utils/auth'
import {prisma} from '@/utils/db'
import {NextResponse} from 'next/server'

export const PATCH = async (
  request: Request,
  {params}: {params: {journalId: string}},
) => {
  const content = await request.json()
  const user = await getUserByCleckID()
  const updateJournal = await prisma.journalEntry.update({
    where: {
      creatorUserId: user?.userId,
      journalId: params.journalId,
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updateJournal.content)

  const updatedAnalysis = await prisma.analysis.update({
    where: {
      journalAnalysisId: updateJournal.journalId,
    },
    data: {
      mood: analysis.mood,
      summary: analysis.summary,
      color: analysis.color,
      subject: analysis.subject,
      negative: analysis.negative,
      sentimentScore: analysis.sentimentScore,
    },
  })

  return NextResponse.json({
    data: updateJournal,
    analysis: JournalEntryAnalisisSchema.parse(updatedAnalysis),
  })
}
