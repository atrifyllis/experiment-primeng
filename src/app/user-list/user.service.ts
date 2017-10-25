import { User } from './../store/users';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {promise} from "selenium-webdriver";
import map = promise.map;

@Injectable()
export class UserService {

	testUsers: Observable<User[]>;

	constructor(private http: HttpClient) {

	}

	getUsers(): Observable<User[]> {
		this.testUsers = this.http.get('/api/users')
			.map((response: any) => {
				if (response !== null) {
					return response._embedded.users;
				}
			});
		return this.testUsers;
	}

	deleteUser(href: string): Observable<string> {
		return this.http.delete(this.bypassProxyProtocolIssue(href));
	}

	updateUser(user: User): Observable<User> {
		const links = user._links;
		if (links === null) {
			return this.http.post('/api/users', user);
		} else {
			return this.http.patch(this.bypassProxyProtocolIssue(links.self.href), user);
		}
	}

	getUserInfo(): Observable<User> {
		return this.http.get('/api/auth/me');
	}

	/**
	 * TODO
	 * When using angular proxy the protocol returned inside links from spring data rest is https instead of http.
	 * This has to do something with the headers of the request. This should not be an issue in production but more investigation is needed.
	 * @param {string} url
	 * @returns {string}
	 */
	private bypassProxyProtocolIssue(url: string) {
		if (url.startsWith('https') && url.indexOf('4200') !== -1) {
			url = url.replace('https', 'http');
		}
		return url;
	}
}
