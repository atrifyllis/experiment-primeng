import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as user from './user-list.actions';
import * as fromUsers from '../store/users';

@Injectable()
export class UserListResolver implements CanActivate {

	constructor(private store: Store<fromUsers.State>) {

	}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		this.store.dispatch(new user.LoadUsersAction());
		return true;
	}
}