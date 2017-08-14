import {sampleUsers} from './../store/sampleData';
import {User} from './../store/users';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import {AngularFireDatabase} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService {

	testUsers: Observable<User[]>;

	constructor(private db: AngularFireDatabase, private http: HttpClient) {
		this.testUsers = http.get('/api/users')
			.map((response: any) => response._embedded.users);
		// TODO: uncomment if you need sample data
		// this.insertUsers(af);
	}

	getUsers(): Observable<User[]> {
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

	private insertUsers(db: AngularFireDatabase) {
		sampleUsers.forEach(user => {
			const usersDb = db.object('/users/' + user._links.self.href);
			usersDb.set(user);
		});
	}
}
