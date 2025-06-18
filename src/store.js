import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from "./redux/pasteSlice"

export default configureStore({
  reducer: {
    paste: PasteReducer,
  },
})