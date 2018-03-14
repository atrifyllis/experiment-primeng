import {User} from './../store/users';
import {State, userEntityAdapter} from '../store/users';
import * as userActions from './user-list.actions';
import * as app from './../app.actions';

export const initialState: State = userEntityAdapter.getInitialState({
	selectedUser: null
});

// this reducer needs to listen to app actions too, to handle the generic error action
export function usersReducer(state: State = initialState, action: userActions.Actions | app.Actions): State {
	switch (action.type) {
		case userActions.ActionTypes.LOAD_USERS_SUCCESS: {
			return userEntityAdapter.addAll(action.payload, state);
		}
		case userActions.ActionTypes.DELETE_USER_SUCCESS: {
			const user: User = action.payload;
			return userEntityAdapter.removeOne(user._links.self.href, state);
		}
		case userActions.ActionTypes.OPEN_UPDATE_USER_DIALOG: {
			const selectedUser = action.payload;
			return Object.assign({}, state, {selectedUser});
		}
		case userActions.ActionTypes.CLOSE_UPDATE_USER_DIALOG: {
			return Object.assign({}, state, {selectedUser: null});
		}
		case userActions.ActionTypes.UPDATE_USER_SUCCESS: {
			// the way upsert works we must re-specify the id if it is not called id (this will be fixed in later version of ngrx-entity)
			// and also it needs a field called changes which is the actual entity
			return userEntityAdapter.upsertOne(
				Object.assign(
					{},
					{id: action.payload._links.self.href},
					{changes: action.payload}),
				state);
		}
		case app.ActionTypes.ERROR: {
			return initialState;
		}
		default: {
			return state;
		}
	}
}
