import {type} from './util';
import {Action} from '@ngrx/store';
import {User} from './store/users';
import {HttpErrorResponse} from '@angular/common/http';

export const ActionTypes = {
	LOGIN: type('[Login] Login'),
	LOGIN_SUCCESS: type('[Login] Login success'),
	GET_USER_INFO_SUCCESS: type('[Login] Get user info'),
	ERROR: type('[App] Error')
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

export class ErrorAction implements Action {
	type = ActionTypes.ERROR;

	constructor(public payload: HttpErrorResponse) {
	}
}

export type Actions = LoginAction | LoginSuccessAction | GetUserInfoSuccessAction | ErrorAction;
