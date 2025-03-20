import { getJournals } from "@/app/actions/get-journals";
import { CreateJournalCard } from "@/components/CreateJournalCard";
import { EntryCard } from "@/components/EntryCard";
import Search from "@/components/Search";
import Link from "next/link";

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
