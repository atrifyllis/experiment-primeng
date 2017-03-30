import { User } from './../store/users';
import { UserService } from './user.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromUser from './user-list.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class UserListEffects {

	@Effect()
	loadUsers$: Observable<Action> = this.actions$
		.ofType(fromUser.ActionTypes.LOAD_USERS)
		.switchMap(() => this.userService.getUsers()
			.map((users: User[]) => new fromUser.LoadUsersSuccessAction(users))
		);

	constructor(private actions$: Actions, private userService: UserService) { }
}
