import {sampleUsers, sampleUsersArray} from './../store/sampleData';
import {initialState, usersReducer} from 'app/user-list/user-list.reducer';
import {CloseUpdateUserDialogAction, LoadUsersSuccessAction, OpenUpdateUserDialogAction} from './user-list.actions';
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
			const action = new LoadUsersSuccessAction([...sampleUsersArray]);
			const result = usersReducer(undefined, action);
			expect(result).toEqual(jasmine.objectContaining({entities: sampleUsers}));
		});
	});

	describe('Open User Dialog', () => {
		it('should set selected user in state', () => {
			const newState = deepFreeze({ users: Object.assign({}, sampleUsers) });
			const action = new OpenUpdateUserDialogAction(newState.users[0]);
			const result = usersReducer(newState, action);
			expect(result.selectedUser).toEqual(newState.users[0]);
		});
	});

	describe('Close User Dialog', () => {
		it('should remove selectedUser from state', () => {
			const newState = deepFreeze({
				users: Object.assign({}, sampleUsers),
				selectedUser: Object.assign({}, sampleUsers[0])
			});
			const action = new CloseUpdateUserDialogAction({});
			const result = usersReducer(newState, action);
			expect(result.selectedUser).toBeNull();
		});
	});
});
