import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import user from "./user";
import employee from "./employee";
import branche from "./branche";
import role from "./role";
import article from "./article";
import articleType from "./articleType";
import author from "./author";
import category from "./category";
import publishingHouse from "./publishingHouse";
import command from "./command";
import sessions from "./sessions";
import courses from "./courses";
import coach from "./coach";
import sessiontypes from "./sessiontypes";
import service from "./service";
import space from "./space";
import tarifSession from "./tarifSession";
import tarif from "./tarif";
import chat from "./chatStore";
import blogs from "./blogs";
import gain from "./gain";
import provider from "./provider";

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
    sessiontypes,
    service,
    space,
    tarifSession,
    tarif,
    blogs,
    provider,
    chat,
    gain,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
