import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { UserListEffects } from './user-list.effects';
import {
	DeleteUserAction, DeleteUserSuccessAction, LoadUsersAction,
	LoadUsersSuccessAction
} from './user-list.actions';
import { sampleUsers } from '../store/sampleData';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';


describe('User List Effects', () => {

	let runner: EffectsRunner;
	let userListEffects: UserListEffects;
	let userService;
	const userId = 1;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule
		],
		providers: [
			UserListEffects,
			{
				provide: UserService,
				useValue: jasmine.createSpyObj('userService', ['getUsers', 'deleteUser'])
			}

		]
	}));

	beforeEach(inject([
			EffectsRunner, UserListEffects
		],
		(_runner, _userListEffects) => {
			runner = _runner;
			userListEffects = _userListEffects;
		}
	));

	beforeEach(() => {
		userService = TestBed.get(UserService);
		userService.getUsers.and.returnValue(Observable.of(sampleUsers));
		userService.deleteUser.and.returnValue(Observable.of(userId));
	});

	it('should load a list of users', () => {
		runner.queue(new LoadUsersAction());
		// fake async service call
		userListEffects.loadUsers$.subscribe(result => fakeAsync(() => {
			expect(result).toEqual(new LoadUsersSuccessAction(sampleUsers));
		}));
	});

	it('should return a DeleteUserSuccessAction with specified user id, on success', () => {
		runner.queue(new DeleteUserAction(userId));
		// fake async service call
		userListEffects.deleteUser$.subscribe(result => fakeAsync(() => {
			expect(result).toEqual(new DeleteUserSuccessAction(userId));
			expect(userService.deleteUser).toHaveBeenCalledWith(userId);
		}));
	});
});
