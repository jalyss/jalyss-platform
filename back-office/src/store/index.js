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
import trainingBooking from "./trainingBooking";
import country from "./Country";
import jobTitle from "./jobTitle";
import functionalArea from "./functionalArea";
import educationLevel from "./educationLevel";
import transition from "./transition";
import city from "./city";
import client from "./client";

export const store = configureStore({
  reducer: {
    ...client,
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
    country,
    chat,
    gain,
    trainingBooking,
    jobTitle,
    functionalArea,
    educationLevel,
    transition,
    city,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
