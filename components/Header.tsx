import {UserButton} from '@clerk/nextjs'
import {auth} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  const {userId}: {userId: string | null} = await auth()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Animo</span>
            <img className="h-20" src="/logo-animo.png" alt="logo animo" />
          </Link>
        </div>
        {userId ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end text-white gap-1 items-center">
            Log out <span aria-hidden="true">&rarr;</span>
            <button className="text-sm font-semibold leading-6 ">
              <UserButton afterSignOutUrl="/" />
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
