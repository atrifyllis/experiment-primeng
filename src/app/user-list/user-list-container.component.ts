import { FormGroup, FormBuilder } from '@angular/forms';
import {
	AppState,
	getSelectedUserState,
	getUsersState
} from './../store/reducer-config';
import { User } from './../store/users';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromUser from './user-list.actions';


@Component({
	selector: 'user-list-container',
	template: `
      <user-list [users]="users$ | async"
                 [selectedUser]="selectedUser$ | async" [userForm]="userForm"
                 (remove)="removeUser($event)" (edit)="editUser($event)"
				 (update)="updateUser($event)" (close)="closeDialog($event)"
				 (create)="createUser($event)">
      </user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;
	selectedUser$: Observable<User>;

	userForm: FormGroup;

	constructor(private store: Store<AppState>, private fb: FormBuilder) {
		this.users$ = store.select(getUsersState);
		this.selectedUser$ = store.select(getSelectedUserState);

		this.userForm = this.fb.group(<User>{
			id: null,
			username: '',
			email: ''
		});
	}

	removeUser(user: User) {
		this.store.dispatch(new fromUser.DeleteUserAction(user.id));
	}

	editUser(user: User) {
		this.store.dispatch(new fromUser.OpenUpdateUserDialogAction(user));
	}

	updateUser(user: User) {
		this.store.dispatch(new fromUser.UpdateUserAction(user));
	}

	createUser() {
		this.store.dispatch(new fromUser.OpenUpdateUserDialogAction(this.newUser()));
	}

	closeDialog() {
		this.store.dispatch(new fromUser.CloseUpdateUserDialogAction());
	}

	newUser(): User {
		return {
			id: -1,
			username: '',
			email: ''
		};
	}
}


