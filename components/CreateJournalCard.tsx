'use client'
import {createNewEntry} from '@/utils/api'
import React from 'react'

export const CreateJournalCard = () => {
  const handleClick = () => {
    createNewEntry()
  }

  return (
    <div>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-8"
        onClick={handleClick}
      >
        Create a new Journey
      </button>
    </div>
  )
}
