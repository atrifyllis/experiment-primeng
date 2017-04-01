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
				users: users
			};
		}
		default: {
			return state;
		}
	}
}
