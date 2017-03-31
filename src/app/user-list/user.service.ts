import { sampleUsers } from './../store/sampleData';
import { User } from './../store/users';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {

	getUsers(): Observable<User[]> {
		return Observable.of(sampleUsers);
	}
}
