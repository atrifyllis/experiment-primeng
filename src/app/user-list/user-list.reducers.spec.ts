
import { initialState, usersReducer } from 'app/user-list/users.reducer';
import { LoadUsersSuccessAction } from './user-list.actions';
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
			expect(result).toEqual({users: sampleUsers });
		});
	});
});
