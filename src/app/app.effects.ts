import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import * as fromApp from './app.actions';
import {Action} from '@ngrx/store';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AppEffects {

	@Effect({dispatch: false})
	loadUsers$: Observable<Action> = this.actions$
		.ofType(fromApp.ActionTypes.LOGIN)
		.switchMap(() => Observable.of(this.oauthService.initImplicitFlow())
			.switchMap((result) => Observable.of({}))
		);

	constructor(private actions$: Actions, private oauthService: OAuthService) {
	}
}
