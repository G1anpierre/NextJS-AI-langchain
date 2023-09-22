'use client'
import {askQuestion} from '@/utils/api'
import React, {useState} from 'react'

const Search = () => {
  const [search, setSearch] = useState('')
  const [response, setResponse] = useState()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const answerResponse = await askQuestion(search)
    setResponse(answerResponse)
  }

  return (
    <>
      <div className="grid mb-8 grid-cols-4 gap-3">
        <div className="col-start-2 col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="gap-2 grid grid-flow-col">
              <input
                type="text"
                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                value={search}
                name="search"
                onChange={e => setSearch(e.target.value)}
                placeholder="Ask a question related to your mood"
              ></input>
              <button
                type="submit"
                className="block rounded bg-indigo-500 px-3.5 text-sm font-semibold text-white"
              >
                Ask
              </button>
            </div>
          </form>
        </div>
        <div className="col-start-2 col-span-2 row-start-2 text- text-indigo-500">
          {response}
        </div>
      </div>
    </>
  )
}

export default Search
