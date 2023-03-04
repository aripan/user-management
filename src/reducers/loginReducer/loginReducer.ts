import { RESET_STATE, SET_EMAIL, SET_EMAIL_ERROR, SET_PASSWORD } from "./action.types"
import { IActionState, IInitialState } from "./interfaces"

export const loginReducerInitialState: IInitialState = {
    email: "",
    password: "",
    emailError: false,
}

export const loginReducer = (state: IInitialState, action: IActionState) => {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state, email: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state, password: action.payload
            }
            case SET_EMAIL_ERROR:
                return {
                    ...state, emailError: action.payload
                }
        case RESET_STATE:
            return loginReducerInitialState
        default:
            return state
    }
}