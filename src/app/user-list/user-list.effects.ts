import {User} from './../store/users';
import {UserService} from './user.service';
import {Action} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as fromUser from './user-list.actions';
import {
	CloseUpdateUserDialogAction,
	DeleteUserAction,
	LoadUsersAction,
	UpdateUserAction,
	UpdateUserSuccessAction
} from './user-list.actions';


import {Observable, of} from 'rxjs';

import {ofType, toPayload} from 'ts-action-operators';
import {catchError, first, map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable()
export class UserListEffects {

	@Effect()
	loadUsers$: Observable<Action> = this.actions$.pipe(
		ofType(LoadUsersAction),
		switchMap(() => this.userService.getUsers().pipe(
			map((users: User[]) => new fromUser.LoadUsersSuccessAction(users)))
		)
	);

	@Effect()
	deleteUser$: Observable<Action> = this.actions$.pipe(
		ofType(DeleteUserAction),
		toPayload(),
		mergeMap((user: User) => this.userService.deleteUser(user).pipe(
			first(),
			map(() => new fromUser.DeleteUserSuccessAction(user)),
			catchError(() => of(new fromUser.DeleteUserFailedAction(user))))
		)
	);

	@Effect()
	updateUser$: Observable<Action> = this.actions$.pipe(
		ofType(UpdateUserAction),
		toPayload(),
		mergeMap((user: User) => this.userService.updateUser(user).pipe(
			first(),
			map((updatedUser: User) => new fromUser.UpdateUserSuccessAction(updatedUser)),
			catchError(() => of(new fromUser.UpdateUserFailedAction(user))))
		)
	);

	@Effect()
	closeDialog$: Observable<Action> = this.actions$.pipe(
		ofType(UpdateUserSuccessAction),
		map(() => new CloseUpdateUserDialogAction({}))
	);

	constructor(private actions$: Actions, private userService: UserService) {
	}
}
