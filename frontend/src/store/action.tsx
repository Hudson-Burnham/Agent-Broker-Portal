import { LOGIN, LOGOUT } from "./types"

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