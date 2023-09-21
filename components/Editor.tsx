'use client'
import {JournalEntryType} from '@/app/(dashboard)/journal/[journalId]/page'
import {updateJournalEntry} from '@/utils/api'
import React, {useState, useEffect, useRef} from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// TODO I have to try this later
// const useAutoSave = ({data, onSave, interval= 2000, saveOnUnmount = true}) => {
//   const valueOnCleanup = useRef(data)
//   const initialRender = useRef(true)
//   const handleSave = useRef(onSave)

//   const debouncedValueToSave = useDebounce(data, interval)

//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false
//     } else {
//       handleSave.current(debouncedValueToSave)
//     }
//   }, [debouncedValueToSave])

//   useEffect(() => {
//     valueOnCleanup.current = data
//   }, [data])

//   useEffect(() => {
//     handleSave.current = onSave
//   }, [onSave])

//   useEffect(
//     () => () => {
//       if (saveOnUnmount) {
//         handleSave.current(valueOnCleanup.current)
//       }
//     },
//     [saveOnUnmount],
//   )

// }

export const Editor = ({journnalEntry}: {journnalEntry: JournalEntryType}) => {
  const [contentValue, setContentValue] = useState(journnalEntry.content)
  const [analisis, setAnalisis] = useState(journnalEntry.analisis)
  const debounceContentValue = useDebounce(contentValue, 1000)

  useEffect(() => {
    const save = async () => {
      const updatedJournal = await updateJournalEntry(
        journnalEntry.journalId,
        debounceContentValue,
      )

      setAnalisis(updatedJournal.analysis)
    }
    save()
  }, [debounceContentValue, journnalEntry.journalId, journnalEntry.analisis])

  const analysisInfo = Object.entries(analisis)
    .filter(([key]) => key !== 'color')
    .map(([key, value]) => ({
      name: key,
      value: String(value),
    }))

  const color = `bg-[${analisis.color}]`

  return (
    <>
      <div className="grid grid-cols-3 h-full">
        <div className="w-full h-full col-span-2">
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={contentValue}
            name="editor"
            onChange={e => setContentValue(e.target.value)}
          />
        </div>
        <div className="h-full border">
          <div className={color}>
            <h1 className="font-bold text-4xl p-8 border-b-2 border-black">
              Analysis
            </h1>
            <ul>
              {analysisInfo?.map(analysis => (
                <li
                  key={analysis.name}
                  className="flex justify-between p-8 border-b-2 border-black"
                >
                  <span>{analysis.name}</span>
                  <span>{analysis.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
