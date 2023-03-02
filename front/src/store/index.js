import { configureStore } from '@reduxjs/toolkit'
import article from './article'
import publishingHouse from './publishingHouse'
import category from './category'
import  articleType from './articleType'
export const store = configureStore({
    reducer: {
     article,
     publishingHouse,
     articleType,
     category
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
