import { Store } from '@ngrx/store';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/Observable/EmptyObservable';

import * as user from './user-list.actions';

import * as fromUsers from '../store/users';

export class UserListResolver implements Resolve<any> {

	constructor(private store: Store<fromUsers.State>) {

	}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		this.store.dispatch(new user.LoadUsersAction());
		return new EmptyObservable();
	}
}