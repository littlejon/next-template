import {
  addListener,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";

import { AppDispatch, AppState } from "store";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  AppState,
  AppDispatch
>;
