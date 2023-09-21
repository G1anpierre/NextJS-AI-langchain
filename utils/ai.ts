import {OpenAI} from 'langchain/llms/openai'
import {PromptTemplate} from 'langchain/prompts'
import {loadQARefineChain} from 'langchain/chains'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'
import {StructuredOutputParser} from 'langchain/output_parsers'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'

import {OutputFixingParser} from 'langchain/output_parsers'
import {Document} from 'langchain/document'

import {z} from 'zod'
import {EntriesSchemaType} from '@/types'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
  }),
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: {format_instructions},
  })

  const input = await prompt.format({
    entry: content,
  })
  return input
}

export const analyze = async (entry: string) => {
  const input = await getPrompt(entry)
  const llm = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
  const result = await llm.call(input)
  try {
    return parser.parse(result)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'}),
      parser,
    )
    const fix = await fixParser.parse(result)
    return fix
  }
}

export const qa = async (question: string, entries: EntriesSchemaType) => {
  const docs = entries.map(entry => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.journalId,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      },
    })
  })
  const llm = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
  const chain = loadQARefineChain(llm)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const result = await chain.call({question, input_documents: relevantDocs})

  return result.output_text
}
