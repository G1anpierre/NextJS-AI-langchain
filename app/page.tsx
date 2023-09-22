import {Clouds} from '@/components/Clouds'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {Hero} from '@/components/Hero'
import {Pricing} from '@/components/Pricing'
import {StatsSections} from '@/components/StatsSections'
// import {useState} from 'react'

export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Clouds />
      <StatsSections />
      <Pricing />
      <Footer />
    </main>
  )
}
