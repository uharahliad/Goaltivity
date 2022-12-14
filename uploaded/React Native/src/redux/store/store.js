import {configureStore} from '@reduxjs/toolkit';
import signInSlice from '../reducers/signInSlice';
import modalSlice from '../reducers/modalSlice';
import channelSlice from '../reducers/channelSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
    modalOpen: modalSlice,
    channnels: channelSlice,
  },
});
