import { User } from './../store/users';
import { State } from '../store/users';
import * as userActions from './user-list.actions';
import * as app from './../app.actions';

export const initialState: State = {
	users: []
};

// this reducer needs to listen to app actions too, to handle the generic error action
export function usersReducer(state: State = initialState, action: userActions.Actions | app.Actions): State {
	switch (action.type) {
		case userActions.ActionTypes.LOAD_USERS_SUCCESS: {
			const users = action.payload;
			return Object.assign({}, state, { users });
		}
		case userActions.ActionTypes.DELETE_USER_SUCCESS: {
			const user: User = action.payload;
			const index = state.users.findIndex((u: User) => u._links.self.href === user._links.self.href);
			const users = [
				...state.users.slice(0, index),
				...state.users.slice(index + 1)
			];
			return Object.assign({}, state, { users });
		}
		case userActions.ActionTypes.OPEN_UPDATE_USER_DIALOG: {
			const selectedUser = action.payload;
			return Object.assign({}, state, { selectedUser });
		}
		case userActions.ActionTypes.CLOSE_UPDATE_USER_DIALOG: {
			return Object.assign({}, state, { selectedUser: null });
		}
		case userActions.ActionTypes.UPDATE_USER_SUCCESS: {
			const updatedUser: User = action.payload;
			const index = state.users.findIndex((user: User) => user._links.self.href === updatedUser._links.self.href);
			let users: User[];
			if (index === -1) {
				// TODO this won't be needed when database is included
				// const newUser: User = Object.assign({}, updatedUser);
				users = [
					...state.users, updatedUser
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
		case app.ActionTypes.ERROR: {
			return initialState;
		}
		default: {
			return state;
		}
	}
}
