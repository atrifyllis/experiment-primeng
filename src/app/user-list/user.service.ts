import { sampleUsers } from './../store/sampleData';
import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class UserService {

	dbUsers: FirebaseListObservable<any[]>;

	constructor(private af: AngularFire) {
		this.dbUsers = af.database.list('/users');
		// TODO: uncomment if you need sample data
		// this.insertUsers(af);
	}

	getUsers(): FirebaseListObservable<User[]> {
		return this.dbUsers;
	}

	deleteUser(userId: string): Observable<string> {
		this.af.database.object('/users/' + userId).remove();
		return Observable.of(userId);
	}

	updateUser(user: User): Observable<User> {
		let newUser: User;
		if (user.$key === null) {
			const id = this.af.database.list('/users').push({
				username: user.username,
				email: user.email
			}).key;
			newUser = Object.assign({}, user, { $key: id });
		} else {
			this.af.database.list('/users').update(user.$key, {
				username: user.username,
				email: user.email
			});
			newUser = Object.assign({}, user);
		}
		return Observable.of(newUser);
	}

	private insertUsers(af: AngularFire) {
		sampleUsers.forEach(user => {
			const usersDb = af.database.object('/users/' + user.$key);
			usersDb.set(user);
		});
	}
}
