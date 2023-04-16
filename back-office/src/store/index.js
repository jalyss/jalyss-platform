import { configureStore } from '@reduxjs/toolkit';
import auth from './auth' 
import user from './user';


export const store = configureStore({
  reducer: {
    auth,
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

