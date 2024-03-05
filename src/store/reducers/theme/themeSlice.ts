import { createSlice } from '@reduxjs/toolkit'

interface themeInterface {
  darkMode: boolean
  modalWindow: boolean
  modalPostWindow: boolean
}

const initialState: themeInterface = {
  darkMode: true,
  modalWindow: false,
  modalPostWindow: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleModalWindow: (state) => {
      state.modalWindow = !state.modalWindow
    },
    togglePostModalWindow: (state) => {
      state.modalPostWindow = !state.modalPostWindow
    },
  },
})

export const { toggleDarkMode, toggleModalWindow, togglePostModalWindow } =
  themeSlice.actions
export default themeSlice.reducer
