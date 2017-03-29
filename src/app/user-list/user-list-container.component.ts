import { User } from './../store/users';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUsers from '../store/users';

@Component({
	selector: 'user-list-container',
	template: `<user-list [users]="users$ | async"></user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;

	constructor(store: Store<fromUsers.State>) {
		this.users$ = store.select();
	}

}
