import React from "react";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  if (!user) return;

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

const NewUser = async () => {
  await createNewUser();

  return <div>NewUser</div>;
};

export default NewUser;
