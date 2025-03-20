import { getUserByCleckID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { JournalEntrySchema } from "@/app/definitions";


export const getEntry = async (journalId: string) => {
    try {
        const user = await getUserByCleckID();
        const journalEntry = await prisma.journalEntry.findUnique({
            where: {
                creatorUserId: user?.userId,
                journalId,
            },
            include: {
                analisis: true,
            },
        });

        const journalEntryData = JournalEntrySchema.safeParse(journalEntry);

        if(journalEntryData.success){ 
            return {
                data: journalEntryData.data,
                success: true,
            };
        }
         return { error: 'Failed on validate journal Entry', success: false };
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Error at creating journal entry: ${e.message}`);
          }
          return { error: 'Failed to get journal entry', success: false };
        };
    }
