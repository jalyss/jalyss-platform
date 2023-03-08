import { configureStore } from '@reduxjs/toolkit'

import article from './article'
import publishingHouse from './publishingHouse'
import category from './category'
import articleType from './articleType'
import author from './author'


export const store = configureStore({
    reducer: {
     article,
     publishingHouse,
     articleType,
     category,
     author
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
