import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import { LOGIN, LOGOUT, SET_USER } from "./types";

const initialState: State = {
  isUserLoggedIn: false,
  user: null,
};

const persistConfig = {
  key: "root",
  storage,
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.payload
      };
    case LOGOUT: 
    return {
        ...state,
        isUserLoggedIn: false,
        user: null
    }
    case SET_USER: 
    return {
      ...state,
      user: action.payload
    }
    default:
      return state;
  }
}

export const persistedReducer = persistReducer(persistConfig, reducer);
