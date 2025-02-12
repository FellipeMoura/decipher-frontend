import { initialState, IUserState } from "./reducer";
import { UserActionTypes } from "./types";

export const login = (payload: IUserState) => ({
    type: UserActionTypes.LOGIN,
    payload
})

export const logout = () => ({
    type: UserActionTypes.LOGIN,
    initialState
})