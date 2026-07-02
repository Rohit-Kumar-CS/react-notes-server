import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addPastes, updatePastes } from '../redux/pasteSlice.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.find((p) => p._id === id);
    const [title, setTitle] = useState(paste ? paste.title : '');
    const [value, setValue] = useState(paste ? paste.content : '');

  return (
    <div className='p-4'>


      <div className='flex flex-row items-center justify-between gap-4 mb-3 w-full'>
        <input type="text"
          placeholder='Search'
          className='border-2 border-gray-300 rounded-md p-4 w-1/2'
          disabled
          value={title}
      />

        {/* <button onClick={createPaste} className='bg-blue-500 text-white p-4 rounded-md '>
          {
            pasteId ? "Update Paste" : "Create Paste"
          }
        </button> */}
      </div>
      <div>
        <textarea
          className='bg-gray-300 h-235 w-full border-2 border-gray-800 p-4 rounded-md'
          value={value}
          disabled
         
          rows={35}></textarea>
      </div>
    </div>
  )
}

export default ViewPaste
