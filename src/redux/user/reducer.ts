import { UserActionTypes } from "./types";

export interface IUserState {
    user: {
        login: string | null;
        name: string | null;
    }
}

export const initialState: IUserState = {
    user: {
        login: null,
        name: null
    }
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
               ...initialState
            }

        default:
            return state;
    }
}

export default userReducer;