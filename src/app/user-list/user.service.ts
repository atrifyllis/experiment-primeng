import { sampleUsers } from './../store/sampleData';
import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {

	users: User[];

	constructor() {
		this.users = sampleUsers;
	}

	getUsers(): Observable<User[]> {
		return Observable.of(this.users);
	}

	deleteUser(userId: number): Observable<number> {
		const index = sampleUsers.findIndex((user: User) => user.id === userId);
		this.users = [
			...this.users.slice(0, index),
			...this.users.slice(index + 1)
		];
		return Observable.of(userId);
	}
}
