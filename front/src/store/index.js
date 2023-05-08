import { configureStore } from '@reduxjs/toolkit'

import article from './article'
import publishingHouse from './publishingHouse'
import category from './category'
import articleType from './articleType'
import author from './author'
import country from './country'
import city from './city'
import command from './command'
import auth from './auth' 


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
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
