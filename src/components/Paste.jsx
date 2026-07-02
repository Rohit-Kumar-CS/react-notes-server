import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removePaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

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
        className='w-full px-4 py-3 rounded-xl bg-white border border-purple-200 shadow-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition'
        type="text"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {filteredPastes.map((paste) => (


          <div
            key={paste._id}
            className="bg-white rounded-3xl shadow-lg border border-purple-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3 break-words">
              {paste.title}
            </h2>

            {/* Content */}
            <p className="text-gray-600 whitespace-pre-wrap break-words line-clamp-4">
              {paste.content}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">

              {/* Remove */}
              <button
                onClick={() => handleRemove(paste._id)}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 duration-300 shadow-md"
              >
                🗑 Remove
              </button>

              {/* Edit */}
              <Link
                to={`/?pasteId=${paste._id}`}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 duration-300 shadow-md"
              >
                ✏ Edit
              </Link>

              {/* View */}
              <Link
                to={`/pastes/${paste._id}`}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 duration-300 shadow-md"
              >
                👁 View
              </Link>

              {/* Copy */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied Successfully!");
                }}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 duration-300 shadow-md"
              >
                📋 Copy
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  const shareLink = `${window.location.origin}/pastes/${paste._id}`;
                  navigator.clipboard.writeText(shareLink);
                  toast.success("Share Link Copied!");
                }}
                className="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:scale-105 duration-300 shadow-md"
              >
                🔗 Share
              </button>

            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                📅 {new Date(paste.createdAt).toLocaleString()}
              </span>

              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                Paste
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Paste
