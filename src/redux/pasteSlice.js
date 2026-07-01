import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPastes: (state, action) => {
      state.pastes.push(action.payload)
    },
    updatePastes: (state, action) => {
      const { index, updatedPaste } = action.payload
      state.pastes[index] = updatedPaste
    },
    resetPastes: (state) => {
      state.pastes = []
    },
    removePaste: (state, action) => {
      const index = action.payload
      state.pastes.splice(index, 1)
    }
}
})

// Action creators are generated for each case reducer function
export const { addPastes, updatePastes, resetPastes, removePaste } = pasteSlice.actions

export default pasteSlice.reducer