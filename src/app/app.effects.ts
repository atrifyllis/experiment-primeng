import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as fromApp from './app.actions';
import {Action} from '@ngrx/store';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from './user-list/user.service';
import {User} from './store/users';
import {Router} from '@angular/router';
import * as RouterActions from './store/router.actions';
import {ofType} from 'ts-action-operators';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class AppEffects {


	@Effect({dispatch: false})
	login$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LoginAction),
		switchMap(() => Observable.of(this.oauthService.initImplicitFlow())
			.switchMap((result) => Observable.of(<Action>{})))
	);

	@Effect()
	logout$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LogoutAction),
		switchMap(() => Observable.of(this.oauthService.logOut())
			.map(() => new fromApp.LogoutSuccessAction({})))
	);

	@Effect()
	loadAuthenticatedUser$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LoginSuccessAction),
		switchMap(() => this.userService.getUserInfo()
			.map((user: User) => {
				return new fromApp.GetUserInfoSuccessAction(user);
			}))
	);

	@Effect()
	error$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.ErrorAction),
		map(() => new RouterActions.Go({path: ['/error']}))
	);

	@Effect({dispatch: false})
	navigate$ = this.actions$.ofType(RouterActions.GO)
		.map((action: RouterActions.Go) => action.payload)
		.do(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}));

	constructor(private actions$: Actions, private oauthService: OAuthService, private userService: UserService, private router: Router) {
	}
}
