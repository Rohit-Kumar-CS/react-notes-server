import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addPastes, updatePastes } from '../redux/pasteSlice.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams({})
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
        Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if (pasteId) {
      dispatch(updatePastes(paste))
    } else {
      dispatch(addPastes(paste))
    }

    // after creation or updation, reset the form and search params
    setTitle('')
    setValue('')
    setSearchParams({})
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  return (
    <>
      <div className='m-4'>

        <div className='flex flex-row items-center justify-between gap-4 mb-3 w-full'>
          <input type="text"
            placeholder='Search'
            className='border-2 border-gray-300 rounded-md p-4 w-1/2'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <button onClick={createPaste} className='bg-blue-500 text-white p-4 rounded-md '>
            {
              pasteId ? "Update Paste" : "Create Paste"
            }
          </button>
        </div>
        <div>
          <textarea
            className='bg-gray-300 h-235 w-full border-2 border-gray-800 p-4 rounded-md'
            value={value}
            placeholder='Enter contant..'
            onChange={(e) => setValue(e.target.value)}
            rows={35}></textarea>
        </div>
      </div>
    </>
  )
}

export default Home

