import { User } from './../store/users';
import { State } from '../store/users';
import * as user from './user-list.actions';

export const initialState: State = {
	users: []
};

export function usersReducer(state = initialState, action: user.Actions): State {
	switch (action.type) {
		case user.ActionTypes.LOAD_USERS_SUCCESS: {
			const users = action.payload;
			return {
				users
			};
		}
		case user.ActionTypes.DELETE_USER_SUCCESS: {
			const userId: number = action.payload;
			const index = state.users.findIndex((user: User) => user.id === userId);
			const users = [
			...state.users.slice(0, index),
			...state.users.slice(index + 1)
			];
			return {
				users
			};
		}
		default: {
			return state;
		}
	}
}
