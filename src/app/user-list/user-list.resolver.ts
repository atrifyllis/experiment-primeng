import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import * as user from './user-list.actions';
import * as fromUsers from '../store/users';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class UserListResolver implements CanActivate {

	constructor(private store: Store<fromUsers.State>, private oauthService: OAuthService) {

	}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		// check if user is logged-in and if not do not navigate
		if (!this.oauthService.hasValidAccessToken()) {
			this.oauthService.initImplicitFlow();
			return false;
		}
		this.store.dispatch(new user.LoadUsersAction());
		return true;
	}
}
