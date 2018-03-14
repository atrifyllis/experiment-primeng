// import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import {inject, TestBed} from '@angular/core/testing';
import {UserListEffects} from './user-list.effects';
import {
	CloseUpdateUserDialogAction,
	DeleteUserAction,
	DeleteUserSuccessAction,
	LoadUsersAction,
	LoadUsersSuccessAction,
	UpdateUserAction,
	UpdateUserSuccessAction
} from './user-list.actions';
import {sampleUsers} from '../store/sampleData';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../store/users';
import {provideMockActions} from '@ngrx/effects/testing';
import {ReplaySubject} from 'rxjs/ReplaySubject';


describe('User List Effects', () => {

	// let runner: EffectsRunner;
	let userListEffects: UserListEffects;
	let actions: ReplaySubject<any>;
	let userService;
	const userId = '1';
	const user: User = {
		_links: null,
		username: 'test-new',
		email: 'test@test.com',
		roles: []
	};

	beforeEach(() => TestBed.configureTestingModule({
		// imports: [
		// 	EffectsTestingModule
		// ],
		providers: [
			UserListEffects,
			provideMockActions(() => actions),
			{
				provide: UserService,
				useValue: jasmine.createSpyObj('userService', ['getUsers', 'deleteUser', 'updateUser'])
			}

		]
	}));

	beforeEach(inject([
			// EffectsRunner,
			UserListEffects
		],
		(_userListEffects) => {
			// runner = _runner;
			userListEffects = _userListEffects;
		}
	));

	beforeEach(() => {
		actions = new ReplaySubject(1);
		userService = TestBed.get(UserService);
		userService.getUsers.and.returnValue(Observable.of(sampleUsers));
		userService.deleteUser.and.returnValue(Observable.of(userId));
		userService.updateUser.and.returnValue(Observable.of(user));
	});

	it('should load a list of users', () => {
		actions.next(LoadUsersAction);

		userListEffects.loadUsers$.subscribe(result => {
			expect(result).toEqual(new LoadUsersSuccessAction(sampleUsers));
		});
	});

	it('should return a DeleteUserSuccessAction with specified user id, on success', () => {
		actions.next(new DeleteUserAction(user));

		userListEffects.deleteUser$.subscribe(result => {
			expect(result).toEqual(new DeleteUserSuccessAction(user));
			expect(userService.deleteUser).toHaveBeenCalledWith(user);
		});
	});

	it('should return an UpdateUserSuccessAction with specified user, on success', () => {
		actions.next(new UpdateUserAction(user));

		userListEffects.updateUser$.subscribe(result => {
			expect(result).toEqual(new UpdateUserSuccessAction(user));
			expect(userService.updateUser).toHaveBeenCalledWith(user);
		});
	});

	it('should return an CloseUpdateUserDialogAction when user is updated successfully', () => {
		actions.next(new UpdateUserSuccessAction(user));

		userListEffects.closeDialog$.subscribe(result => {
			expect(result).toEqual(new CloseUpdateUserDialogAction({}));
		});
	});
});
