import {State} from './store/global';
import * as app from './app.actions';

export const initialState: State = {
	isAuthenticated: false
};

export function appReducer(state: State = initialState, action: app.Actions): State {
	switch (action.type) {
		case app.ActionTypes.LOGIN_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: true});
		}
		default: {
			return state;
		}
	}
}
