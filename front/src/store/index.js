import { configureStore } from "@reduxjs/toolkit";

import article from './article'
import publishingHouse from './publishingHouse'
import category from './category'
import articleType from './articleType'
import author from './author'
import country from './country'
import city from './city'
import command from './command'
import auth from './auth' 
import blog from './blog' 
import user from './user'
import bookmark from './bookmarks'
import session from './session'
import chat from './chat'

import service from "./space";

export const store = configureStore({
  reducer: {
    article,
    publishingHouse,
    articleType,
    category,
    author,
    country,
    city,
    command,
    auth,
    blog,
    bookmark,
    user,
    session,
    chat,
    service,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
