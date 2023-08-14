import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import { LOGIN, LOGOUT } from "./types";

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
        isUserLoggedIn: !state.isUserLoggedIn,
        user: action.payload
      };
    case LOGOUT: 
    return {
        ...state,
        isUserLoggedIn: !state.isUserLoggedIn,
        user: null
    }
    default:
      return state;
  }
}

export const persistedReducer = persistReducer(persistConfig, reducer);
