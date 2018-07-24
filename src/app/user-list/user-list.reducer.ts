import {User} from './../store/users';
import {State, userEntityAdapter} from '../store/users';
import * as userActions from './user-list.actions';
import {
	CloseUpdateUserDialogAction,
	DeleteUserSuccessAction,
	LoadUsersSuccessAction,
	OpenUpdateUserDialogAction,
	UpdateUserSuccessAction
} from './user-list.actions';
import * as app from './../app.actions';
import {ErrorAction} from '../app.actions';

export const initialState: State = userEntityAdapter.getInitialState({
	selectedUser: null
});

// this reducer needs to listen to app actions too, to handle the generic error action
export function usersReducer(state: State = initialState, action: typeof userActions.Actions | typeof app.Actions): State {
	switch (action.type) {
		case LoadUsersSuccessAction.type: {
			return userEntityAdapter.addAll(action.payload, state);
		}
		case DeleteUserSuccessAction.type: {
			const user: User = action.payload;
			return userEntityAdapter.removeOne(user._links.self.href, state);
		}
		case OpenUpdateUserDialogAction.type: {
			const selectedUser = action.payload;
			return Object.assign({}, state, {selectedUser});
		}
		case CloseUpdateUserDialogAction.type: {
			return Object.assign({}, state, {selectedUser: null});
		}
		case UpdateUserSuccessAction.type: {
			return userEntityAdapter.upsertOne(action.payload, state);
		}
		case ErrorAction.type: {
			return initialState;
		}
		default: {
			return state;
		}
	}
}
