import { LOGIN, LOGOUT, SET_USER } from "./types"

export const login = (payload: any) => {
    return {
        type: LOGIN,
        payload
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const setUser = (payload: any) => {
    return {
        type: SET_USER,
        payload
    }
}