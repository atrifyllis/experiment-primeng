import {User} from './users';
import {HttpErrorResponse} from '@angular/common/http';

export interface State {
	isAuthenticated: boolean;
	authenticatedUser: User;
	error: HttpErrorResponse;
}
