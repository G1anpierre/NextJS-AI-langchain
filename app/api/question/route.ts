import {EntriesSchema} from '@/types'
import {qa} from '@/utils/ai'
import {getUserByCleckID} from '@/utils/auth'
import {prisma} from '@/utils/db'
import {NextResponse} from 'next/server'

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
