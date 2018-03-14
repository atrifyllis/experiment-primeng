import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState, getSelectedUserState, selectAllUsers} from './../store/reducer-config';
import {User} from './../store/users';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromUser from './user-list.actions';
import {AtLeastOneCheckedValidator} from './form-dialog/at-least-one-checked.validator';
import {FieldValuesMatchValidator} from 'app/user-list/form-dialog/field-values-match.validator';


export const userFormInit = {
	_links: '',
	username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
	email: ['', [Validators.required, Validators.email]],
	roles: new FormArray([], AtLeastOneCheckedValidator),
	password: '',
	confirmPassword: ''
};

@Component({
	selector: 'user-list-container',
	template: `
		<user-list [users]="users$ | async"
							 [selectedUser]="selectedUser$ | async" [userForm]="userForm"
							 (remove)="removeUser($event)" (edit)="editUser($event)"
							 (update)="updateUser($event)" (close)="closeDialog()"
							 (create)="createUser()">
		</user-list>`
})
export class UserListContainerComponent {

	users$: Observable<User[]>;
	selectedUser$: Observable<User>;

	userForm: FormGroup;

	constructor(private store: Store<AppState>, private fb: FormBuilder) {
		this.users$ = store.select(selectAllUsers);
		this.selectedUser$ = store.select(getSelectedUserState);

		this.userForm = this.fb.group(userFormInit, {validator: FieldValuesMatchValidator()});
	}

	removeUser(user: User) {
		this.store.dispatch(new fromUser.DeleteUserAction(user));
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
		this.store.dispatch(new fromUser.CloseUpdateUserDialogAction({}));
	}

	newUser(): User {
		return {
			_links: null,
			username: '',
			email: '',
			roles: []
		};
	}
}



