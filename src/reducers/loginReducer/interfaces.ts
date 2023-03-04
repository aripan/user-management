
export interface IInitialState {

    email: string;
    password: string;
    emailError: boolean,


}
export interface IActionState {
    type: string;
    payload?: any
}