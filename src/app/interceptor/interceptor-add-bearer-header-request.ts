import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable()
export class AddBearerHeaderInterceptor implements HttpInterceptor {

	constructor(private oauthService: OAuthService) {

	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// this check is needed here for example if we try to delete or update a user when access token has expired
		if (!this.oauthService.hasValidAccessToken()) {
			this.oauthService.initImplicitFlow();
		} else {
			const accessToken = 'Bearer ' + this.oauthService.getAccessToken();
			const duplicateReq = req.clone({ headers: req.headers.set('Authorization', accessToken) });
			return next.handle(duplicateReq);
		}
	}
}
