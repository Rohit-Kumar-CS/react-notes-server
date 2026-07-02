import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removePaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleRemove(pasteId) {
    dispatch(removePaste(pasteId));
  }


  return (
    <div className='p-4'>
      <input
        className='border-2 border-gray-300 rounded-md p-4 w-full'
        type="text"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {filteredPastes.map((paste) => (
          <div key={paste._id} className='border-2 border-gray-300 rounded-md p-4'>
            <h3 className='text-xl font-bold'>{paste.title}</h3>
            <p className='text-gray-600'>{paste.content}</p>
            <div>
              <button className='bg-red-500 text-white p-2 rounded-md mt-2' onClick={() => handleRemove(paste._id)}>
                Remove
              </button>
              <button className='bg-blue-500 text-white p-2 rounded-md mt-2 ml-2' >

                <a href={`/?pasteId=${paste._id}`} className='text-white'>
                  Edit
                </a>
              </button>
              <button className='bg-green-500 text-white p-2 rounded-md mt-2 ml-2'
              >
                <a href={`/pastes/${paste._id}`} className='text-white'>
                  View
                </a>
              </button>

              <button className='bg-yellow-500 text-white p-2 rounded-md mt-2 ml-2' onClick={() => {
                // Set the search params to the pasteId for copying
                navigator.clipboard.writeText(paste.content);
                toast.success('Paste content copied to clipboard!');
              }}>
                Copy
              </button>
              <button className='bg-purple-500 text-white p-2 rounded-md mt-2 ml-2' onClick={() => {
                // Set the search params to the pasteId for sharing
                const shareLink = `${window.location.origin}/pastes/${paste._id}`;
                navigator.clipboard.writeText(shareLink);
                toast.success('Share link copied to clipboard!');
              }}>
                Share
              </button>
            </div>
            <div className='text-gray-400 text-sm mt-2'>Created At: {new Date(paste.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Paste
