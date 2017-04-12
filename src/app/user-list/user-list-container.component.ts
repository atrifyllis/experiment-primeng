import { AppState, getUsersState } from './../store/reducer-config';
import { User } from './../store/users';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromUser from './user-list.actions';



@Component({
	selector: 'user-list-container',
	template: `<user-list [users]="users$ | async" (remove)="removeFromCollection($event)"></user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;

	constructor(private store: Store<AppState>) {
		this.users$ = store.select(getUsersState);
	}

	removeFromCollection(user: User) {
		this.store.dispatch(new fromUser.DeleteUserAction(user.id));
	}
}


