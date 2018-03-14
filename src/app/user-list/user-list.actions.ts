import {User} from './../store/users';
import {type} from '../util';
import {action, payload, union} from 'ts-action';

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
	UPDATE_USER_FAILED: type('[User] Update User Failed'),
};


export const LoadUsersAction = action('[User] Load', payload<any>());
export const LoadUsersSuccessAction = action('[User] Load Success', payload<User[]>());
export const DeleteUserAction = action('[User] Delete', payload<User>());
export const DeleteUserSuccessAction = action('[User] Delete Success', payload<User>());
export const DeleteUserFailedAction = action('[User] Delete Failed', payload<User>());
export const OpenUpdateUserDialogAction = action('[User] Open Update User Dialog', payload<User>());
export const CloseUpdateUserDialogAction = action('[User] Close Update User Dialog', payload<any>());
export const UpdateUserAction = action('[User] Update User', payload<User>());
export const UpdateUserSuccessAction = action('[User] Update User Success', payload<User>());
export const UpdateUserFailedAction = action('[User] Update User Failed', payload<User>());

export const Actions = union({
	LoadUsersAction, LoadUsersSuccessAction, DeleteUserAction, DeleteUserSuccessAction,
	DeleteUserFailedAction, OpenUpdateUserDialogAction, CloseUpdateUserDialogAction,
	UpdateUserAction, UpdateUserSuccessAction, UpdateUserFailedAction
});
