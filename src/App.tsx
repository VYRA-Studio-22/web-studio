import type { ReactNode } from 'react'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Portfolio } from './sections/Portfolio'
import { Process } from './sections/Process'

function App(): ReactNode {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
    </>
  )
}

export default App
