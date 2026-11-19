import type { ReactNode } from 'react'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Portfolio } from './sections/Portfolio'

function App(): ReactNode {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
    </>
  )
}

export default App
