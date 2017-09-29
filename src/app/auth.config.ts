import { AuthConfig } from 'angular-oauth2-oidc';

const BASE_URL = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port;

export const authConfig: AuthConfig = {


	// Url of the Identity Provider
	// issuer: 'http://localhost:8080/oauth/authorize',

	loginUrl: BASE_URL + '/oauth/authorize',

	// URL of the SPA to redirect the user to after login
	redirectUri: BASE_URL,

	// The SPA's id. The SPA is registerd with this id at the auth-server
	clientId: 'sampleClientId',

	// set the scope for the permissions the client should request
	// The first three are defined by OIDC. The 4th is a usecase-specific one
	scope: 'read',

	showDebugInformation: true,

	oidc: false
}
