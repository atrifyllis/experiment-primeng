import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getAuthenticatedUserState} from './store/reducer-config';
import {Observable} from 'rxjs/Observable';
import {User} from './store/users';

@Injectable()
export class PermissionService {

	authenticatedUser$: Observable<User>;

	constructor(store: Store<AppState>) {
		this.authenticatedUser$ = store.select(getAuthenticatedUserState);
	}

	hasPermission(role: String): Observable<boolean> {
		return this.authenticatedUser$.map(user => user ? user.roles.some(roleType => roleType === role) : false);
	}
}
