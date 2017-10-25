import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getAuthenticatedState, getAuthenticatedUserState} from './store/reducer-config';
import {Observable} from 'rxjs/Observable';
import {authConfig} from './auth.config';
import * as app from './app.actions';
import {OAuthService} from 'angular-oauth2-oidc';
import {User} from "./store/users";

@Component({
	selector: 'app-root',
	template: `
		<app-component [isAuthenticated]="isAuthenticated$ | async"
									 [authenticatedUser]="authenticatedUser$ | async"
									 (login)="login($event)">
		</app-component>`
})
export class AppContainerComponent {

	isAuthenticated$: Observable<boolean>;
	authenticatedUser$: Observable<User>;

	constructor(private oauthService: OAuthService, private store: Store<AppState>) {
		this.isAuthenticated$ = store.select(getAuthenticatedState);
		this.authenticatedUser$ = store.select(getAuthenticatedUserState);

		this.oauthService.configure(authConfig);

		if (this.oauthService.getAccessToken() !== null) {
			this.store.dispatch(new app.LoginSuccessAction());
		} else {
			// NOTE: the call to tryLogin here is required from the library to retrieve the token after the redirect from the auth server.
			// Also, because the library seems to have no events or callbacks that work for non-oidc authentication,
			// we need to manually check if the authentication was successful (by calling getAccessToken)
			Observable.fromPromise(this.oauthService.tryLogin())
				.subscribe(() => {
					if (this.oauthService.getAccessToken() !== null) {
						this.store.dispatch(new app.LoginSuccessAction());
					}
				});
		}
	}

	login() {
		this.store.dispatch(new app.LoginAction());
	}
}
