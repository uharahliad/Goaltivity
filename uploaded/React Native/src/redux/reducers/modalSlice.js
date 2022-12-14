import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'modalOpen',
  initialState: {
    modalOpen: false,
  },
  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});

export const {setModalOpen} = slice.actions;

export default slice.reducer;
