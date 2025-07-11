import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "../../types/Alltypes";

const initialState: UIState = {
  selectedEditedId: null,
  selectedBorrowId: null,
  selectedDeleteId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedEditedId: (state, action: PayloadAction<string | null>) => {
      state.selectedEditedId = action.payload;
    },
    setSelectedBorrowId: (state, action: PayloadAction<string | null>) => {
      state.selectedBorrowId = action.payload;
    },
    setSelectedDeletedId: (state, action: PayloadAction<string | null>) => {
      state.selectedDeleteId = action.payload;
    },
    closeEditedModal: (state) => {
      state.selectedEditedId = null;
    },
    closeBorrowModal: (state) => {
      state.selectedBorrowId = null;
    },
    closeDeletedModal: (state) => {
      state.selectedDeleteId = null;
    },
  },
});

export const {
  setSelectedEditedId,
  setSelectedBorrowId,
  setSelectedDeletedId,
  closeBorrowModal,
  closeEditedModal,
  closeDeletedModal,
} = uiSlice.actions;

export default uiSlice.reducer;
