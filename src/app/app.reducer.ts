import {GlobalState} from './store/global';
import * as app from './app.actions';
import {ErrorAction, GetUserInfoSuccessAction, LoginSuccessAction, LogoutSuccessAction} from './app.actions';

export const initialState: GlobalState = {
	isAuthenticated: false,
	authenticatedUser: null,
	error: null
};

export function appReducer(state: GlobalState = initialState, action: typeof app.Actions): GlobalState {
	switch (action.type) {
		case LoginSuccessAction.type: {
			return Object.assign({}, state, {isAuthenticated: true});
		}
		case LogoutSuccessAction.type: {
			return Object.assign({}, state, {isAuthenticated: false, authenticatedUser: null})
		}
		case GetUserInfoSuccessAction.type: {
			const authenticatedUser = action.payload;
			return Object.assign({}, state, {authenticatedUser});
		}
		case ErrorAction.type: {
			return Object.assign({}, state, {error: action.payload});
		}
		default: {
			return state;
		}
	}
}
