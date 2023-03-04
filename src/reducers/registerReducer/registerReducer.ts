import { RESET_STATE, SET_ANSWER, SET_CONFIRM_PASSWORD, SET_CONFIRM_PASSWORD_ERROR, SET_EMAIL, SET_EMAIL_ERROR, SET_FIRST_NAME, SET_LAST_NAME, SET_PASSWORD, SET_PASSWORD_ERROR, SET_SELECTED_QUESTION } from "./action.types"
import { IActionState, IInitialState } from "./interfaces"

export const registerReducerInitialState: IInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedQuestion: undefined,
    answer: "",
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
}

export const registerReducer = (state: IInitialState, action: IActionState) => {
    switch (action.type) {
        case SET_FIRST_NAME:
            return {
                ...state, firstName: action.payload
            }
        case SET_LAST_NAME:
            return {
                ...state, lastName: action.payload
            }
        case SET_EMAIL:
            return {
                ...state, email: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state, password: action.payload
            }
        case SET_CONFIRM_PASSWORD:
            return {
                ...state, confirmPassword: action.payload
            }
        case SET_SELECTED_QUESTION:
            return {
                ...state, selectedQuestion: action.payload
            }
        case SET_ANSWER:
            return {
                ...state, answer: action.payload
            }

        case SET_EMAIL_ERROR:
            return {
                ...state, emailError: action.payload
            }
        case SET_PASSWORD_ERROR:
            return {
                ...state, passwordError: action.payload
            }
        case SET_CONFIRM_PASSWORD_ERROR:
            return {
                ...state, confirmPasswordError: action.payload
            }
        case RESET_STATE:
            return registerReducerInitialState
        default:
            return state
    }
}