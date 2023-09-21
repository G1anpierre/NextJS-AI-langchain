import {qa} from '@/utils/ai'
import {getUserByCleckID} from '@/utils/auth'
import {prisma} from '@/utils/db'
import {NextResponse} from 'next/server'
import {z} from 'zod'

export const QuestionSchema = z.object({
  journalId: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const EntriesSchema = z.array(QuestionSchema)

export type EntriesSchemaType = z.infer<typeof EntriesSchema>

export const POST = async (request: Request) => {
  const {question} = await request.json()
  const user = await getUserByCleckID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      creatorUserId: user?.userId,
    },
    select: {
      journalId: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const answer = await qa(question, EntriesSchema.parse(entries))
  return NextResponse.json({data: answer})
}
