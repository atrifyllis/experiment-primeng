import {User} from './../store/users';
import {action, payload, union} from 'ts-action';


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
