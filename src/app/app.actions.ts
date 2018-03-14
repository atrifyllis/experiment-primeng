import {User} from './store/users';
import {HttpErrorResponse} from '@angular/common/http';
import {action, payload, union} from 'ts-action';


export const LoginAction = action('[Login] Login', payload<any>());
export const LogoutAction = action('[Login] Logout', payload<any>());
export const LoginSuccessAction = action('[Login] Login success', payload<any>());
export const LogoutSuccessAction = action('[Login] Logout success', payload<any>());
export const GetUserInfoSuccessAction = action('[Login] Get user info', payload<User>());
export const ErrorAction = action('[App] Error', payload<HttpErrorResponse>());

export const Actions = union({
	LoginAction, LogoutAction, LoginSuccessAction,
	LogoutSuccessAction, GetUserInfoSuccessAction, ErrorAction
});
