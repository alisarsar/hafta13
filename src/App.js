import React from 'react'
import { useGlobalContext } from './context.js'

// components
import Navbar from './Navbar.js'
import CartContainer from './CartContainer.js'
// items

function App() {
  const { loading } = useGlobalContext()

  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
