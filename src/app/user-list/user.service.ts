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

	deleteUser(userId: string): Observable<string> {
		this.db.object('/users/' + userId).remove();
		return Observable.of(userId);
	}

	updateUser(user: User): Observable<User> {
		let newUser: User;
		if (user.$key === null) {
			const id = this.db.list('/users').push({
				username: user.username,
				email: user.email
			}).key;
			newUser = Object.assign({}, user, {$key: id});
		} else {
			this.db.list('/users').update(user.$key, {
				username: user.username,
				email: user.email
			});
			newUser = Object.assign({}, user);
		}
		return Observable.of(newUser);
	}

	private insertUsers(db: AngularFireDatabase) {
		sampleUsers.forEach(user => {
			const usersDb = db.object('/users/' + user.$key);
			usersDb.set(user);
		});
	}
}
