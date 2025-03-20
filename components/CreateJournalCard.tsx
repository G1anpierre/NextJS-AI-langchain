"use client";
import { createJournalEntry } from "@/app/actions/create-journal";
import React from "react";

export const CreateJournalCard = () => {
  return (
    <div>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-8"
        onClick={async () => {
          await createJournalEntry();
        }}
      >
        Create a new Journey
      </button>
    </div>
  );
};
