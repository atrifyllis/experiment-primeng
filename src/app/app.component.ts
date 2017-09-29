import { Component } from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'
	]
})
export class AppComponent {
	title = 'PrimeNG/Ngrx/Material integrated';

	constructor(private oauthService: OAuthService) {
		this.oauthService.configure(authConfig);
		// NOTE: for some reason if we don't call this at first then on login the access_token is not stored
		this.oauthService.tryLogin();
	}
}
