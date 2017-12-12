import { User } from './../store/users';
import { UserService } from './user.service';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromUser from './user-list.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserListEffects {

	@Effect()
	loadUsers$: Observable<Action> = this.actions$
		.ofType(fromUser.ActionTypes.LOAD_USERS)
		.switchMap(() => this.userService.getUsers()
			.map((users: User[]) => new fromUser.LoadUsersSuccessAction(users))
		);

	@Effect()
	deleteUser$: Observable<Action> = this.actions$
		.ofType(fromUser.ActionTypes.DELETE_USER)
		.map((action: fromUser.DeleteUserAction) => action.payload)
		.mergeMap((user: User) => this.userService.deleteUser(user).first()
			.map(() => new fromUser.DeleteUserSuccessAction(user))
			.catch(() => of(new fromUser.DeleteUserFailedAction(user)))
		);

	@Effect()
	updateUser$: Observable<Action> = this.actions$
		.ofType(fromUser.ActionTypes.UPDATE_USER)
		.map((action: fromUser.UpdateUserAction) => action.payload)
		.mergeMap((user: User) => this.userService.updateUser(user).first()
			.map((updatedUser: User) => new fromUser.UpdateUserSuccessAction(updatedUser))
			.catch(() => of(new fromUser.UpdateUserFailedAction(user)))
		);

	@Effect()
	closeDialog$: Observable<Action> = this.actions$
		.ofType(fromUser.ActionTypes.UPDATE_USER_SUCCESS)
		.map((action: fromUser.UpdateUserSuccessAction) => new fromUser.CloseUpdateUserDialogAction());

	constructor(private actions$: Actions, private userService: UserService) { }
}
