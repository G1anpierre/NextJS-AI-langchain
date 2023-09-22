import {UserButton} from '@clerk/nextjs'
import {auth} from '@clerk/nextjs'

export const Header = async () => {
  const {userId}: {userId: string | null} = await auth()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </a>
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
