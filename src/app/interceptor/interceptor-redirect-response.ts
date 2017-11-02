import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {OAuthService} from 'angular-oauth2-oidc';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer-config';
import * as app from './../app.actions';

/**
 * This interceptor redirects to login page
 * 1) in case of an invalid token (the do part) or
 * 2) in case of any http error
 */
@Injectable()
export class RedirectInterceptor implements HttpInterceptor {

	private readonly logoPartialUrl = '/login'.toLowerCase();

	constructor(private oauthService: OAuthService, private store: Store<AppState>) {

	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.do(event => {
				if (event instanceof HttpResponseBase) {
					const response = event as HttpResponseBase;
					if (response && response.ok && response.url && response.url.toLowerCase().indexOf(this.logoPartialUrl) >= 0) {
						const queryStringIndex = response.url.indexOf('?');
						const loginUrl = queryStringIndex && queryStringIndex > 0 ? response.url.substring(0, queryStringIndex) : response.url;
						console.log('User logout detected, redirecting to login page: %s', loginUrl);
						this.oauthService.logOut();
						this.store.dispatch(new app.LoginAction());
					}
				}
			})
			.catch(error => {
				console.log(error);
				this.oauthService.logOut();
				this.store.dispatch(new app.LoginAction());
				return Observable.throw(error);
			})
			;
	}
}
