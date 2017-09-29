import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private oauthService: OAuthService) { }

	ngOnInit() {
	}

	login() {
		this.oauthService.initImplicitFlow();
	}
}
