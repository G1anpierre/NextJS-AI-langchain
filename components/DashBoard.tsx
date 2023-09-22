import {UserButton} from '@clerk/nextjs'
import Link from 'next/link'

export const DashBoard = ({children}: {children: React.ReactNode}) => {
  const links = [
    {href: '/', name: 'Home'},
    {href: '/journal', name: 'Journals'},
    {href: '/history', name: 'History'},
  ]

  return (
    <div className="grid grid-cols-[300px_minmax(900px,_1fr)] grid-rows-[80px_1fr] h-screen">
      <div className="row-start-2 col-start-1 border-r-4">
        <div>
          <div>
            <ul className="grid grid-flow-row auto-rows-[50px] gap-1">
              {links.map(link => (
                <Link
                  href={link.href}
                  key={link.name}
                  className="bg-gray-200 hover:bg-gray-400 cursor-pointer flex justify-center items-center"
                >
                  <li>{link.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-3 border-b-4">
        <div className="flex items-center justify-between h-20 bg-gray-500 px-4">
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full">
            <span>Dash</span>
          </div>
          <div className="">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
      <div className="col-start-2 row-start-2 p-4">{children}</div>
    </div>
  )
}
