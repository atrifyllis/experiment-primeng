import { type } from './util';
import { Action } from '@ngrx/store';

export const ActionTypes = {
	LOGIN: type('[Login] Login'),
	LOGIN_SUCCESS: type('[Login] Login success')
};

export class LoginAction implements Action {
	type = ActionTypes.LOGIN;

}

export class LoginSuccessAction implements Action {
	type = ActionTypes.LOGIN_SUCCESS;

}

export type Actions = LoginAction | LoginSuccessAction;
