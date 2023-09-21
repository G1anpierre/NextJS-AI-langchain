import {auth} from '@clerk/nextjs'
import {prisma} from './db'

export const getUserByCleckID = async () => {
  const {userId} = await auth()
  if (!userId) return
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })
  return user
}
