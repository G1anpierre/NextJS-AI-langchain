
import { JournalsUserSchema } from "@/types";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";


export const getJournals = async () => {
    const { userId } = await auth();
    if (!userId) return;
  
    const journals = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        journals: true,
      },
    });
  
    return JournalsUserSchema.parse(journals?.journals);
  };