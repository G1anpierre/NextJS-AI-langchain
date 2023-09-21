import {ChartAnalysis} from '@/components/Chart'
import {getUserByCleckID} from '@/utils/auth'
import {prisma} from '@/utils/db'

const getData = async () => {
  const user = await getUserByCleckID()
  const analyses = await prisma.analysis.findMany({
    where: {
      creatorUserId: user?.userId,
    },
    select: {
      sentimentScore: true,
      mood: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return {avg, analyses}
}

const Hystory = async () => {
  const {avg, analyses} = await getData()

  return (
    <div>
      Average of sentiment: {avg}
      <ChartAnalysis data={analyses} />
    </div>
  )
}

export default Hystory
