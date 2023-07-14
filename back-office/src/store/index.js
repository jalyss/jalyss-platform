import { configureStore } from '@reduxjs/toolkit';
import auth from './auth' 
import user from './user';
import employee from './employee';
import branche from './branche';
import role from './role'
import article from './article';
import articleType from './articleType';
import author from './author';
import category from './category';
import publishingHouse from './publishingHouse';
import command from './command';
import service from './service'
import space from './space';
import tarif from './tarif';
import provider from './provider';

export const store = configureStore({
  reducer: {
    auth,
    user,
    employee,
    branche,
    role,
    article,
    articleType,
    author,
    category,
    publishingHouse,
    command,
    service,
    space,
    tarif,
    provider,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

