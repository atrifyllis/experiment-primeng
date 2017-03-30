import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {

	getUsers(): Observable<User[]> {
		const users: User[] = [
			{ id: 1, username: 'user1', email: 'mail@test.com' }
		];
		return Observable.of(users);
	}
}
