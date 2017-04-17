import { sampleUsers } from './../store/sampleData';
import { initialState, usersReducer } from 'app/user-list/user-list.reducer';
import {
	DeleteUserSuccessAction,
	LoadUsersSuccessAction,
	OpenUpdateUserDialogAction,
	UpdateUserSuccessAction,
	CloseUpdateUserDialogAction
} from './user-list.actions';
import { User } from '../store/users';
import * as deepFreeze from 'deep-freeze-strict';


describe('UserListReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;
			const result = usersReducer(undefined, action);
			expect(result).toEqual(initialState);
		});
	});

	describe('Load Users', () => {
		it('should update the state with the users', () => {
			const action = new LoadUsersSuccessAction([...sampleUsers]);
			const result = usersReducer(undefined, action);
			expect(result).toEqual({ users: sampleUsers });
		});
	});

	describe('Delete User', () => {
		it('should remove user from state', () => {
			const userId = 1;
			const initialState = deepFreeze({ users: [...sampleUsers] });
			const action = new DeleteUserSuccessAction(userId);
			const result = usersReducer(initialState, action);
			const expectedUsers = sampleUsers.slice(1, sampleUsers.length)
			expect(result).toEqual({ users: expectedUsers });
		});
	});

	describe('Open User Dialog', () => {
		it('should set selected user in state', () => {
			const initialState = deepFreeze({ users: [...sampleUsers] });
			const action = new OpenUpdateUserDialogAction(initialState.users[0]);
			const result = usersReducer(initialState, action);
			expect(result.selectedUser).toBeGreaterThanOrEqual(initialState.users[0]);
		});
	});

	describe('Close User Dialog', () => {
		it('should remove selectedUser from state', () => {
			const initialState = deepFreeze({ users: [...sampleUsers], selectedUser: Object.assign({}, sampleUsers[0]) });
			const action = new CloseUpdateUserDialogAction();
			const result = usersReducer(initialState, action);
			expect(result.selectedUser).toBeNull();
		});
	});

	describe('Update User', () => {
		it('should update user in state', () => {
			const initialState = deepFreeze({ users: [...sampleUsers] });
			const user: User = {
				id: 1,
				username: 'test-new',
				email: 'mail@test.com'
			};
			const action = new UpdateUserSuccessAction(user);
			const result = usersReducer(initialState, action);
			const updatedUser = result.users[0];
			expect(updatedUser).toEqual(user);
		});
	});
});
