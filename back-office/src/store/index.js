import { configureStore } from '@reduxjs/toolkit';
import auth from './auth' 
import user from './user';
import employee from './employee';


export const store = configureStore({
  reducer: {
    auth,
    user,
    employee
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

