import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as fromApp from './app.actions';
import {Action} from '@ngrx/store';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from './user-list/user.service';
import {User} from './store/users';
import {Router} from '@angular/router';
import {go} from '@ngrx/router-store';

@Injectable()
export class AppEffects {

	@Effect({dispatch: false})
	login$: Observable<Action> = this.actions$
		.ofType(fromApp.ActionTypes.LOGIN)
		.switchMap(() => Observable.of(this.oauthService.initImplicitFlow())
			.switchMap((result) => Observable.of(<Action>{}))
		);

	@Effect()
	loadAuthenticatedUser$: Observable<Action> = this.actions$
		.ofType(fromApp.ActionTypes.LOGIN_SUCCESS)
		.switchMap(() => this.userService.getUserInfo()
			.map((user: User) => {
				return new fromApp.GetUserInfoSuccessAction(user);
			})
		);

	@Effect()
	error$: Observable<Action> = this.actions$
		.ofType(fromApp.ActionTypes.ERROR)
		.map(() => go(['/error']))
			;

	constructor(private actions$: Actions, private oauthService: OAuthService, private userService: UserService, private router: Router) {
	}
}
