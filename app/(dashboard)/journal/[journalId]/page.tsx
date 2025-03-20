import { getEntry } from "@/app/actions/get-entries";
import { Editor } from "@/components/Editor";
import React from "react";

const JournalDetails = async ({
  params,
}: {
  params: Promise<{ journalId: string }>;
}) => {
  const resultParams = await params;
  const journalEntry = await getEntry(resultParams.journalId);

  if (!journalEntry) {
    return <div>Journal not found</div>;
  }

  return <Editor journnalEntry={journalEntry} />;
};

export default JournalDetails;
