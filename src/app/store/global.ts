import {User} from './users';
import {HttpErrorResponse} from '@angular/common/http';
import {RouterState} from '@ngrx/router-store';

export interface State {
	isAuthenticated: boolean;
	authenticatedUser: User;
	error: HttpErrorResponse;
}
