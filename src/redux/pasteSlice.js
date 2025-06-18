import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

// Helper function to safely handle localStorage
const getStoredPastes = () => {
  try {
    const storedPastes = localStorage.getItem("pastes");
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const pasteSlice = createSlice({
    name: 'paste',
    initialState: {
        pastes: getStoredPastes()
    },
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;
            
            // Validate paste object
            if (!paste.title || !paste.content) {
                toast.error("Invalid paste data");
                return;
            }

            state.pastes.push(paste);
            try {
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste created successfully");
            } catch (error) {
                console.error("Error saving to localStorage:", error);
                toast.error("Error saving paste");
            }
        },

        updateToPaste: (state, action) => {
            const paste = action.payload;

            // Validate paste object
            if (!paste._id || !paste.title || !paste.content) {
                toast.error("Invalid paste data");
                return;
            }

            const index = state.pastes.findIndex((obj) => obj._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                try {
                    localStorage.setItem("pastes", JSON.stringify(state.pastes));
                    toast.success("Paste updated successfully");
                } catch (error) {
                    console.error("Error saving to localStorage:", error);
                    toast.error("Error updating paste");
                }
            } else {
                toast.error("Paste not found");
            }
        },

        removeFromPaste: (state, action) => {
            const pasteId = action.payload;

            if (!pasteId) {
                toast.error("Invalid paste ID");
                return;
            }

            const index = state.pastes.findIndex((obj) => obj._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                try {
                    localStorage.setItem("pastes", JSON.stringify(state.pastes));
                    toast.success("Paste deleted successfully");
                } catch (error) {
                    console.error("Error saving to localStorage:", error);
                    toast.error("Error deleting paste");
                }
            } else {
                toast.error("Paste not found");
            }
        },

        resetAllPaste: (state) => {
            state.pastes = [];
            try {
                localStorage.removeItem("pastes");
                toast.success("All pastes cleared");
            } catch (error) {
                console.error("Error clearing localStorage:", error);
                toast.error("Error clearing pastes");
            }
        },
    },
});

export const { addToPaste, updateToPaste, removeFromPaste, resetAllPaste } = pasteSlice.actions;

export default pasteSlice.reducer;