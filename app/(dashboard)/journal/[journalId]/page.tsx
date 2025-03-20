import { getEntry } from "@/app/actions/get-entries";
import { Editor } from "@/components/Editor";
import React from "react";

const JournalDetails = async ({
  params,
}: {
  params: { journalId: string };
}) => {
  const journalEntry = await getEntry(params.journalId);

  if (!journalEntry) {
    return <div>Journal not found</div>;
  }

  return <Editor journnalEntry={journalEntry} />;
};

export default JournalDetails;
