import {JournalUserSchemaType} from '@/types'
import React from 'react'

export const EntryCard = (journal: JournalUserSchemaType) => {
  const date = new Date(journal.createdAt).toDateString()

  return (
    <div className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <h1 className="text-xl font-bold truncate">{journal.content}</h1>
      <span>{date}</span>
    </div>
  )
}
