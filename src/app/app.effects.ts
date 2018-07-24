import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import * as fromApp from './app.actions';
import {Action} from '@ngrx/store';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from './user-list/user.service';
import {User} from './store/users';
import {Router} from '@angular/router';
import * as RouterActions from './store/router.actions';
import {ofType} from 'ts-action-operators';
import {map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class AppEffects {


	@Effect({dispatch: false})
	login$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LoginAction),
		switchMap(() => of(this.oauthService.initImplicitFlow()).pipe(
			switchMap((result) => of(<Action>{})))
		)
	);

	@Effect()
	logout$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LogoutAction),
		switchMap(() => of(this.oauthService.logOut()).pipe(
			map(() => new fromApp.LogoutSuccessAction({})))
		)
	);

	@Effect()
	loadAuthenticatedUser$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.LoginSuccessAction),
		switchMap(() => this.userService.getUserInfo().pipe(
			map((user: User) => {
				return new fromApp.GetUserInfoSuccessAction(user);
			})
			)
		)
	);

	@Effect()
	error$: Observable<Action> = this.actions$.pipe(
		ofType(fromApp.ErrorAction),
		map(() => new RouterActions.Go({path: ['/error']}))
	);

	@Effect({dispatch: false})
	navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
		map((action: RouterActions.Go) => action.payload),
		tap(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}))
	)
	;

	constructor(private actions$: Actions, private oauthService: OAuthService, private userService: UserService, private router: Router) {
	}
}
