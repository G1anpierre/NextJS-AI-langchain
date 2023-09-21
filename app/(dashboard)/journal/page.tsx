import {CreateJournalCard} from '@/components/CreateJournalCard'
import {EntryCard} from '@/components/EntryCard'
import Search from '@/components/Search'
import {prisma} from '@/utils/db'
import {auth} from '@clerk/nextjs'
import Link from 'next/link'
import {z} from 'zod'

export const JournalUserSchema = z.object({
  journalId: z.string(),
  content: z.string(),
  createdAt: z.date(),
})

export const JournalsUserSchema = z.array(JournalUserSchema).optional()

export type JournalUserSchemaType = z.infer<typeof JournalUserSchema>

const getJournals = async () => {
  const {userId} = await auth()
  if (!userId) return

  const journals = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      journals: true,
    },
  })

  return JournalsUserSchema.parse(journals?.journals)
}

const Journy = async () => {
  const journals = await getJournals()
  return (
    <>
      <CreateJournalCard />
      <Search />
      <div className="grid grid-cols-3 gap-4">
        {journals?.map(journal => (
          <Link href={`/journal/${journal.journalId}`} key={journal.journalId}>
            <EntryCard {...journal} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Journy
