import Link from 'next/link'
import React from 'react'

const footerNavigation = [
  {
    name: 'Solutions',
    link: [
      {name: 'Marketing', href: '#'},
      {name: 'Analytics', href: '#'},
      {name: 'Commerce', href: '#'},
      {name: 'Insights', href: '#'},
    ],
  },
  {
    name: 'Support',
    link: [
      {name: 'Pricing', href: '#'},
      {name: 'Documentation', href: '#'},
      {name: 'Guides', href: '#'},
      {name: 'API Status', href: '#'},
    ],
  },
  {
    name: 'Company',
    link: [
      {name: 'About', href: '#'},
      {name: 'Blog', href: '#'},
      {name: 'Jobs', href: '#'},
      {name: 'Press', href: '#'},
      {name: 'Partners', href: '#'},
    ],
  },
  {
    name: 'Legal',
    link: [
      {name: 'Claim', href: '#'},
      {name: 'Privacy', href: '#'},
      {name: 'Terms', href: '#'},
    ],
  },
]

export const Footer = () => {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img className="h-40" src="/logo-animo.png" alt="Logo animo" />
          <div className="grid grid-rows-2 grid-cols-2 gap-8 md:grid-rows-1 md:grid-cols-4 xl:col-start-2 xl:col-span-2">
            {footerNavigation.map(column => (
              <div key={column.name}>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  {column.name}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {column.link.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
