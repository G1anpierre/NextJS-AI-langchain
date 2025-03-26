"use server";


import { analyze } from "@/utils/ai";
import { getUserByCleckID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const createJournalEntry = async () => {
    const user = await getUserByCleckID();
  if (!user) 
    return NextResponse.error();
  try {
    const createdJournal = await prisma.journalEntry.create({
      data: {
        creatorUserId: user.userId,
        content: "Write about your day!",
      },
    });

    // Analyze the journal entry with AI and save the analysis
    const analysis = await analyze(createdJournal.content);

    await prisma.analysis.create({
      data: {
        journalAnalysisId: createdJournal.journalId,
        creatorUserId: createdJournal.creatorUserId,
        mood: analysis.mood,
        summary: analysis.summary,
        color: analysis.color,
        subject: analysis.subject,
        negative: analysis.negative,
        sentimentScore: analysis.sentimentScore,
      },
    });

    revalidatePath("/journal");

    return NextResponse.json({
      data: createdJournal,
      analysis: analysis,
    });
  } catch (e: unknown) {

    if (e instanceof Error) {
      console.error(`Error at creating journal entry: ${e.message || e}`);
    }
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 });
  }

}