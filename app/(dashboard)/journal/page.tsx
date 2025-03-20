import { CreateJournalCard } from "@/components/CreateJournalCard";
import { EntryCard } from "@/components/EntryCard";
import Search from "@/components/Search";
import { JournalsUserSchema } from "@/types";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const getJournals = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const journals = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      journals: true,
    },
  });

  return JournalsUserSchema.parse(journals?.journals);
};

const Journy = async () => {
  const journals = await getJournals();
  return (
    <>
      <CreateJournalCard />
      <Search />
      <div className="grid grid-cols-3 gap-4">
        {journals?.map((journal) => (
          <Link href={`/journal/${journal.journalId}`} key={journal.journalId}>
            <EntryCard {...journal} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Journy;
