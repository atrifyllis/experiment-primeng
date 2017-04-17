import { User } from './../store/users';
import { Action } from '@ngrx/store';
import { type } from '../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	LOAD_USERS: type('[User] Load'),
	LOAD_USERS_SUCCESS: type('[User] Load Success'),
	DELETE_USER: type('[User] Delete'),
	DELETE_USER_SUCCESS: type('[User] Delete Success'),
	DELETE_USER_FAILED: type('[User] Delete Failed'),
	OPEN_UPDATE_USER_DIALOG: type('[User] Open Update User Dialog'),
	CLOSE_UPDATE_USER_DIALOG: type('[User] Close Update User Dialog'),
	UPDATE_USER: type('[User] Update User'),
	UPDATE_USER_SUCCESS: type('[User] Update User Success'),
	UPDATE_USER_FAILED: type('[User] Update User Failed')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadUsersAction implements Action {
	type = ActionTypes.LOAD_USERS;

	constructor(public payload?: any) { }
}


export class DeleteUserAction implements Action {
	type = ActionTypes.DELETE_USER;

	constructor(public payload: number) { }
}

export class DeleteUserSuccessAction implements Action {
	type = ActionTypes.DELETE_USER_SUCCESS;

	constructor(public payload: number) { }
}

export class DeleteUserFailedAction implements Action {
	type = ActionTypes.DELETE_USER_FAILED;

	constructor(public payload: number) { }
}

export class LoadUsersSuccessAction implements Action {
	type = ActionTypes.LOAD_USERS_SUCCESS;

	constructor(public payload: User[]) { }
}

export class OpenUpdateUserDialogAction implements Action {
	type = ActionTypes.OPEN_UPDATE_USER_DIALOG;

	constructor(public payload: User) { }
}

export class CloseUpdateUserDialogAction implements Action {
	type = ActionTypes.CLOSE_UPDATE_USER_DIALOG;

	constructor(public payload?: any) { }
}

export class UpdateUserAction implements Action {
	type = ActionTypes.UPDATE_USER;

	constructor(public payload: User) {}
}

export class UpdateUserSuccessAction implements Action {
	type = ActionTypes.UPDATE_USER_SUCCESS;

	constructor(public payload: User) {}
}

export class UpdateUserFailedAction implements Action {
	type = ActionTypes.UPDATE_USER_FAILED;

	constructor(public payload: User) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= LoadUsersAction
	| LoadUsersSuccessAction
	| DeleteUserAction
	| DeleteUserSuccessAction
	| DeleteUserFailedAction
	| OpenUpdateUserDialogAction
	| CloseUpdateUserDialogAction
	| UpdateUserAction
	| UpdateUserSuccessAction
	| UpdateUserFailedAction
	;
