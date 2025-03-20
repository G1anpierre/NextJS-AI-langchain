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
            return journalEntryData.data;
        }
         return null;
    } catch (e) {
        console.error(`Error at getting journal - ${e}`);
        return null;
    }
};
