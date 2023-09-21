const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const response = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    }),
  )
  const data = await response.json()
  return data
}

export const updateJournalEntry = async (
  journalId: string,
  content: string,
) => {
  const response = await fetch(
    new Request(`/api/journal/${journalId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    }),
  )

  const data = await response.json()
  return data
}

export const askQuestion = async (question: string) => {
  const response = await fetch(
    new Request(`/api/question`, {
      method: 'POST',
      body: JSON.stringify({question}),
    }),
  )

  const data = await response.json()
  return data.data
}
