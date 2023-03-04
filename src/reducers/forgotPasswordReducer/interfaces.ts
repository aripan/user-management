import { ISecurityQuestionProps } from '../../utilities/SecurityQuestions/SecurityQuestions';

export interface IInitialState {
    email: string;
    password: string;
    confirmPassword: string;
    selectedQuestion: ISecurityQuestionProps | undefined;
    answer: string;
    emailError: boolean,
    passwordError: boolean,
    enableSetPassword: boolean,
    confirmPasswordError: boolean,

}
export interface IActionState {
    type: string;
    payload?: any
}