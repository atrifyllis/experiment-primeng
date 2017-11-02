import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UserListEffects } from './user-list.effects';
import {
	CloseUpdateUserDialogAction,
	DeleteUserAction,
	DeleteUserSuccessAction,
	LoadUsersAction,
	LoadUsersSuccessAction,
	UpdateUserAction,
	UpdateUserSuccessAction
} from './user-list.actions';
import { sampleUsers } from '../store/sampleData';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../store/users';


describe('User List Effects', () => {

	let runner: EffectsRunner;
	let userListEffects: UserListEffects;
	let userService;
	const userId = '1';
	const user: User = {
		_links: null,
		username: 'test-new',
		email: 'test@test.com',
		roles: []
	};

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule
		],
		providers: [
			UserListEffects,
			{
				provide: UserService,
				useValue: jasmine.createSpyObj('userService', ['getUsers', 'deleteUser', 'updateUser'])
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
		userService.updateUser.and.returnValue(Observable.of(user));
	});

	it('should load a list of users', () => {
		runner.queue(new LoadUsersAction());

		userListEffects.loadUsers$.subscribe(result => {
			expect(result).toEqual(new LoadUsersSuccessAction(sampleUsers));
		});
	});

	it('should return a DeleteUserSuccessAction with specified user id, on success', () => {
		runner.queue(new DeleteUserAction(userId));
		userListEffects.deleteUser$.subscribe(result => {
			expect(result).toEqual(new DeleteUserSuccessAction(userId));
			expect(userService.deleteUser).toHaveBeenCalledWith(userId);
		});
	});

	it('should return an UpdateUserSuccessAction with specified user, on success', () => {
		runner.queue(new UpdateUserAction(user));
		userListEffects.updateUser$.subscribe(result => {
			expect(result).toEqual(new UpdateUserSuccessAction(user));
			expect(userService.updateUser).toHaveBeenCalledWith(user);
		});
	});

	it('should return an CloseUpdateUserDialogAction when user is updated successfully', () => {
		runner.queue(new UpdateUserSuccessAction(user));
		userListEffects.closeDialog$.subscribe(result => {
			expect(result).toEqual(new CloseUpdateUserDialogAction());
		});
	});
});
