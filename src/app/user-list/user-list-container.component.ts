import { AppState, getUsersState } from './../store/reducer-config';
import { User } from './../store/users';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';



@Component({
	selector: 'user-list-container',
	template: `<user-list [users]="users$ | async"></user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;

	constructor(store: Store<AppState>) {
		this.users$ = store.select(getUsersState);
	}

}


