import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex gap-4 p-4 bg-gray-200 justify-around'>
      <Link to="/">Home</Link>
      <Link to="/pastes">Pastes</Link>
    </div>
  )
}

export default Navbar
