import { initialState, usersReducer } from 'app/user-list/user-list.reducer';
import {
	DeleteUserAction, DeleteUserSuccessAction,
	LoadUsersSuccessAction
} from './user-list.actions';
import { sampleUsers } from '../store/sampleData';


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
			const action = new LoadUsersSuccessAction(sampleUsers);
			const result = usersReducer(undefined, action);
			expect(result).toEqual({ users: sampleUsers });
		});
	});

	describe('Delete User', () => {
		it('should remove user from state', () => {
			const userId = 1;
			const action = new DeleteUserSuccessAction(userId);
			const result = usersReducer({ users: sampleUsers }, action);
			const index = sampleUsers.findIndex(user => user.id === userId);
			sampleUsers.splice(index, 1);
			expect(result).toEqual({ users: sampleUsers });
		});
	});
});
