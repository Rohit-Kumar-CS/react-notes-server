import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex gap-4 m-4 p-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 justify-around font-bold text-white text-lg'>
      <Link to="/">Home</Link>
      <Link to="/pastes">Pastes</Link>
    </div>
  )
}

export default Navbar
