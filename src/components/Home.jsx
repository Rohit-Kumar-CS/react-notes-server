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
      <div className='m-4 '>

        <div className='flex flex-row items-center justify-between gap-4 mb-3 w-full'>
          <input type="text"
            placeholder='Search'
            className='w-1/2 px-4 py-3 rounded-xl bg-white border border-purple-200 shadow-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <button onClick={createPaste} className="px-4.5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg transition duration-300">
            {
              pasteId ? "Update Paste" : "Create Paste"
            }
          </button>
        </div>
        <div>
          <textarea
           className="w-full h-[700px] p-5 rounded-2xl bg-white border border-purple-200 shadow-lg resize-none outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
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

