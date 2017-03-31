import { AppState } from './../store/reducer-config';
import { User, State } from './../store/users';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';

const getUsers = (state: AppState) => state.userState.users;

@Component({
	selector: 'user-list-container',
	template: `<user-list [users]="users$ | async"></user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;

	constructor(store: Store<AppState>) {
		this.users$ = store.select(getUsers);
	}

}


