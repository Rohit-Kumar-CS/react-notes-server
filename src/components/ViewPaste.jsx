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
          className='w-1/2 px-4 py-3 rounded-xl bg-white border border-purple-200 shadow-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition'
          disabled
          value={title}
      />

      </div>
      <div>
        <textarea
          className="w-full h-[700px] p-5 rounded-2xl bg-white border border-purple-200 shadow-lg resize-none outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          value={value}
          disabled
         
          rows={35}></textarea>
      </div>
    </div>
  )
}

export default ViewPaste
