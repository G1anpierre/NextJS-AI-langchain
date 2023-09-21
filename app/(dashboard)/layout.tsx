import {DashBoard} from '@/components/DashBoard'

export default function DashBoardDefault({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashBoard>{children}</DashBoard>
    </>
  )
}
