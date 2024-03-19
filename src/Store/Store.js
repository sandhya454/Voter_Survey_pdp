// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
  },
});
