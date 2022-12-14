import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    setNewChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const {setNewChannels} = slice.actions;

export default slice.reducer;
