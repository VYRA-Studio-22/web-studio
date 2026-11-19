import type { ReactNode } from 'react'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Portfolio } from './sections/Portfolio'
import { Process } from './sections/Process'
import { Contacts } from './sections/Contacts'
import { Footer } from './sections/Footer'

function App(): ReactNode {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Contacts />
      <Footer />
    </>
  )
}

export default App
