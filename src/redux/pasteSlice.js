import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPastes: (state, action) => {
      const paste = action.payload
      state.pastes.push(paste)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      // localStorage.setItem('pastes',state.pastes)
      toast.success('Paste created successfully!')
    },
    updatePastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((p) => p._id === paste._id)
      if (index !== -1) {
        state.pastes[index] = paste
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste updated successfully!')
      }
    },
    resetPastes: (state) => {
      state.pastes = []
      localStorage.removeItem('pastes')
      toast.success('Pastes reset successfully!')
    },
    removePaste: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((p) => p._id === pasteId)
      if (index !== -1) {
        state.pastes.splice(index, 1)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste removed successfully!')
      }
    }
}
})

// Action creators are generated for each case reducer function
export const { addPastes, updatePastes, resetPastes, removePaste } = pasteSlice.actions

export default pasteSlice.reducer