import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getAuthenticatedUserState} from './store/reducer-config';
import {Observable} from 'rxjs';
import {User} from './store/users';
import {map} from 'rxjs/operators';

@Injectable()
export class PermissionService {

	authenticatedUser$: Observable<User>;

	constructor(store: Store<AppState>) {
		this.authenticatedUser$ = store.select(getAuthenticatedUserState);
	}

	hasPermission(role: String): Observable<boolean> {
		return this.authenticatedUser$.pipe(
			map(user => user ? user.roles.some(roleType => roleType === role) : false)
		);
	}
}
