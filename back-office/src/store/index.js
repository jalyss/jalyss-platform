import { configureStore } from '@reduxjs/toolkit';
import auth from './auth' 
import user from './user';
import employee from './employee';
import branche from './branche';
import role from './role'
import article from './article';

export const store = configureStore({
  reducer: {
    auth,
    user,
    employee,
    branche,
    role,
    article
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

