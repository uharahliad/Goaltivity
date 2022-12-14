import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'isSignedIn',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    setSignIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const {setSignIn} = slice.actions;

export default slice.reducer;
