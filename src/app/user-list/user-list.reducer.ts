import { User } from './../store/users';
import { State } from '../store/users';
import * as user from './user-list.actions';
import { calculateNewId } from './id.calculator';

export const initialState: State = {
	users: []
};

export function usersReducer(state: State = initialState, action: user.Actions): State {
	switch (action.type) {
		case user.ActionTypes.LOAD_USERS_SUCCESS: {
			const users = action.payload;
			return Object.assign({}, state, { users });
		}
		case user.ActionTypes.DELETE_USER_SUCCESS: {
			const userId: number = action.payload;
			const index = state.users.findIndex((user: User) => user.id === userId);
			const users = [
				...state.users.slice(0, index),
				...state.users.slice(index + 1)
			];
			return Object.assign({}, state, { users });
		}
		case user.ActionTypes.OPEN_UPDATE_USER_DIALOG: {
			const selectedUser = action.payload;
			return Object.assign({}, state, { selectedUser });
		}
		case user.ActionTypes.CLOSE_UPDATE_USER_DIALOG: {
			return Object.assign({}, state, { selectedUser: null });
		}
		case user.ActionTypes.UPDATE_USER_SUCCESS: {
			const updatedUser: User = action.payload;
			const index = state.users.findIndex((user: User) => user.id === updatedUser.id);
			let users: User[];
			if (index === -1) {
				// TODO this won't be needed when database is included
				const newUser: User = Object.assign({}, updatedUser, { id: calculateNewId(state.users) });
				users = [
					...state.users, newUser
				];
			} else {
				users = [
					...state.users.slice(0, index),
					updatedUser,
					... state.users.slice(index + 1)
				];
			}
			return Object.assign({}, state, { users });
		}
		default: {
			return state;
		}
	}
}
