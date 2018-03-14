import {User} from './users';
import {HttpErrorResponse} from '@angular/common/http';

export interface GlobalState {
	isAuthenticated: boolean;
	authenticatedUser: User;
	error: HttpErrorResponse;
}
