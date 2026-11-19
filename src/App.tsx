import type { ReactNode } from 'react'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'

function App(): ReactNode {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}

export default App
