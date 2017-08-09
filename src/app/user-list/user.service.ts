import { sampleUsers } from './../store/sampleData';
import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UserService {

	dbUsers: FirebaseListObservable<any[]>;

	constructor(private db: AngularFireDatabase) {
		this.dbUsers = db.list('/users');
		// TODO: uncomment if you need sample data
		// this.insertUsers(af);
	}

	getUsers(): FirebaseListObservable<User[]> {
		return this.dbUsers;
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
			newUser = Object.assign({}, user, { $key: id });
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
