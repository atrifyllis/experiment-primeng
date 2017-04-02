import { reducer } from '../store/reducer-config';
import { initialState } from 'app/user-list/users.reducer';
import { LoadUsersSuccessAction } from './user-list.actions';
import { sampleUsers } from '../store/sampleData';


describe('BooksReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;
			const result = reducer(undefined, action);
			// TODO why does the result contain the router state too???
			expect(result).toEqual(jasmine.objectContaining({ userState: initialState }));
		});
	});

	describe('Load Users', () => {
		it('should update the state with the users', () => {
			const action = new LoadUsersSuccessAction(sampleUsers);
			const result = reducer(undefined, action);
			// TODO why does the result contain the router state too???
			expect(result).toEqual(jasmine.objectContaining({ userState: {users: sampleUsers }}));
		});
	});
});
