import {State} from './store/global';
import * as app from './app.actions';

export const initialState: State = {
	isAuthenticated: false,
	authenticatedUser: null,
	error: null
};

export function appReducer(state: State = initialState, action: app.Actions): State {
	switch (action.type) {
		case app.ActionTypes.LOGIN_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: true});
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
