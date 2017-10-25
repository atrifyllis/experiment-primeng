import {type} from './util';
import {Action} from '@ngrx/store';
import {User} from './store/users';

export const ActionTypes = {
	LOGIN: type('[Login] Login'),
	LOGIN_SUCCESS: type('[Login] Login success'),
	GET_USER_INFO_SUCCESS: type('[Login] Get user info')
};

export class LoginAction implements Action {
	type = ActionTypes.LOGIN;

	constructor(public payload?: any) {
	}
}

export class LoginSuccessAction implements Action {
	type = ActionTypes.LOGIN_SUCCESS;

	constructor(public payload?: any) {
	}
}

export class GetUserInfoSuccessAction implements Action {
	type = ActionTypes.GET_USER_INFO_SUCCESS;

	constructor(public payload: User) {
	}
}

export type Actions = LoginAction | LoginSuccessAction | GetUserInfoSuccessAction;
