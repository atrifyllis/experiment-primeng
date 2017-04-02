import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { UserListEffects } from './user-list.effects';
import { LoadUsersAction, LoadUsersSuccessAction } from './user-list.actions';
import { sampleUsers } from '../store/sampleData';
import { UserService } from './user.service';


describe('User List Effects', () => {

	let runner: EffectsRunner;
	let userListEffects: UserListEffects;
	let userService;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule
		],
		providers: [
			UserListEffects,
			{
				provide: UserService,
				useValue: jasmine.createSpyObj('userService', ['getUsers'])
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
		userService.getUsers.and.returnValue(sampleUsers);
	});

	it('should load a list of users', () => {
		runner.queue(new LoadUsersAction());
		// fake async service call
		userListEffects.loadUsers$.subscribe(result => fakeAsync(() => {
			expect(result).toEqual(new LoadUsersSuccessAction(sampleUsers));
		}));
	});
});
