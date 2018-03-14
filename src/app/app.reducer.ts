import {GlobalState} from './store/global';
import * as app from './app.actions';

export const initialState: GlobalState = {
	isAuthenticated: false,
	authenticatedUser: null,
	error: null
};

export function appReducer(state: GlobalState = initialState, action: app.Actions): GlobalState {
	switch (action.type) {
		case app.ActionTypes.LOGIN_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: true});
		}
		case app.ActionTypes.LOGOUT_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: false, authenticatedUser: null })
		}
		case app.ActionTypes.GET_USER_INFO_SUCCESS: {
			const authenticatedUser = action.payload;
			return Object.assign({}, state, {authenticatedUser});
		}
		case app.ActionTypes.ERROR: {
			return Object.assign({}, state, {error: action.payload});
		}
		default: {
			return state;
		}
	}
}
