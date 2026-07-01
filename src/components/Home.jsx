import React from 'react'
import { useState } from 'react'

const Home = () => {
    const [title, setTitle] = useState('')
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <input type="text" placeholder='Search' className='border-2 border-gray-300 rounded-md p-2 w-full' value="title" onChange={(e) => setTitle(e.target.value)} />
    </div>
  )
}

export default Home

