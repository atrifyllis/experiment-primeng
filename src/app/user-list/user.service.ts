import {User} from './../store/users';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

	// TODO maybe add the prefix using an interceptor?
	API_PREFIX: String;
	testUsers: Observable<User[]>;
	jwtHelper: JwtHelperService;

	constructor(private http: HttpClient, private oauthService: OAuthService) {
		this.jwtHelper = new JwtHelperService({});
		this.API_PREFIX = environment.apiPrefix;
	}

	getUsers(): Observable<User[]> {
		this.testUsers = this.http.get(this.API_PREFIX + '/users/search/findAllEnabled')
			.map((response: any) => {
				if (response !== null) {
					return response._embedded.users;
				}
			});
		return this.testUsers;
	}

	deleteUser(user: User): Observable<any> {
		// reset password to empty or else it retrieves the password in the backend somehow....
		return this.updateUser(Object.assign({}, user, {enabled: false, password: null, confirmPassword: null}));
	}

	updateUser(user: User): Observable<any> {
		const links = user._links;
		if (links === null) {
			return this.http.post(this.API_PREFIX + '/users', user);
		} else {
			if (!user.password && !user.confirmPassword) {
				user = Object.assign({}, user, {password: undefined, confirmPassword: undefined})
			}
			return this.http.patch(this.makeUrlRelative(links.self.href), user);
		}
	}

	getUserInfo(): Observable<User> {
		const jwtToken = this.jwtHelper.decodeToken(this.oauthService.getAccessToken());
		console.log(jwtToken);
		const user: User = {
			username: jwtToken.user_name,
			roles: jwtToken.authorities,
			email: jwtToken.email
		};
		return Observable.of(user);
	}

	/**
	 * This is needed because XSRF does not work in angular if the URL is absolute
	 *
	 * @param {string} url
	 * @returns {string}
	 */
	makeUrlRelative(url: string) {
		return url.substring(url.indexOf('/api'));
	}

	/**
	 * @deprecated
	 * When using angular proxy the protocol returned inside links from spring data rest is https instead of http (if the server is https).
	 * This has to do something with the headers of the request. This should not be an issue in production but more investigation is needed.
	 * @param {string} url
	 * @returns {string}
	 */
	private bypassProxyProtocolIssue(url: string) {
		const start = url.indexOf('/api');
		url = url.substring(start);
		// if (url.startsWith('https') && url.indexOf('4200') !== -1) {
		// 	url = url.replace('https', 'http');
		// }
		return url;
	}
}
