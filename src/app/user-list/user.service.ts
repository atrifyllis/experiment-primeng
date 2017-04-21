import { sampleUsers } from './../store/sampleData';
import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

import {calculateNewId} from './id.calculator';


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
		const index = this.users.findIndex((user: User) => user.id === userId);
		this.users = [
			...this.users.slice(0, index),
			...this.users.slice(index + 1)
		];
		return Observable.of(userId);
	}

	updateUser(user: User): Observable<number> {
		const index = this.users.findIndex((u: User) => u.id === user.id);
		let id: number;
		if (index === -1) {
			const newUser = Object.assign({}, user, {id: calculateNewId(this.users)});
			this.users = [
				...this.users, newUser
			];
			id = newUser.id;
		} else {
			this.users = [
				...this.users.slice(0, index),
				user,
				...this.users.slice(index + 1)
			];
			id = user.id;
		}
		return Observable.of(id);
	}
}
