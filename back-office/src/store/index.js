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
import sessions from './sessions';
import courses from './courses';
import coach from './coach';
import sessiontyps from './sessiontyps';
import service from './service'
import space from './space';
import tarifss from './tarifss';
import tarif from './tarif';

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
    sessions,
    courses,
    coach,
    sessiontyps,
    service,
    space,
    tarifss,
    tarif
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

