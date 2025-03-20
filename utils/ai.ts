import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "langchain/output_parsers";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { z } from "zod";
import { EntriesSchemaType } from "@/types";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    summary: z.string().describe("quick summary of the entire entry."),
    color: z
      .string()
      .describe(
        "a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

const getPrompt = async (entry: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = PromptTemplate.fromTemplate(
    "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}"
  );

  const input = await prompt.format({
    entry,
    format_instructions,
  });
  return input;
};

export const analyze = async (entry: string) => {
  const input = await getPrompt(entry);
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const chain = RunnableSequence.from([
    model,
    new StringOutputParser(),
  ]);
  
  const result = await chain.invoke(input);
  try {
    return parser.parse(result);
  } catch (e) {
    // Retry with structured format correction
    const fixingChain = RunnableSequence.from([
      (input) => `Fix the following AI output to match this JSON schema: 
      ${parser.getFormatInstructions()}
      
      Output to fix: ${input}`,
      model,
      new StringOutputParser(),
    ]);

    const fixedResult = await fixingChain.invoke(result);
    return await parser.parse(fixedResult);

  }
};

export const qa = async (question: string, entries: EntriesSchemaType) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.journalId,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      },
    });
  });
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Save the documents in a vector store
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  // Create retriever from vector store
  const retriever = vectorstore.asRetriever();

  // Create the document chain
  const documentChain = await createStuffDocumentsChain({
    llm: model,
    prompt: PromptTemplate.fromTemplate(`
      You are an AI assistant analyzing journal entries.
      Answer the question based only on the following journal entries:
      
      {context}
      
      Question: {question}
      
      Provide a helpful, concise answer:
    `),
  });

  // Create the retrieval chain
  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain: documentChain,
  });

  // Invoke the retrieval chain
  const result = await retrievalChain.invoke({
    input: question,
  });
  
  return result.answer;
};
