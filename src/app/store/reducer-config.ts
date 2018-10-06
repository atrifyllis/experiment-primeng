import {environment} from './../../environments/environment';
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {usersReducer} from '../user-list/user-list.reducer';
import * as fromUsers from './users';
import * as fromGlobal from './global';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';
/**
 * storeLogger is a metareducer that logs out each time we dispatch an action.
 */
import {appReducer} from '../app.reducer';
import {RouterStateSerializer} from '@ngrx/router-store';
import {Params, RouterStateSnapshot} from '@angular/router';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
	userState: fromUsers.State;
	globalState: fromGlobal.State;
	routerReducer: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
	globalState: appReducer,
	userState: usersReducer,
	routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
	return function(state, action) {
		console.log('state', state);
		console.log('action', action);

		return reducer(state, action);
	}
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze, debug] : [];

export interface RouterStateUrl {
	url: string;
	queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		const { url } = routerState;
		const queryParams = routerState.root.queryParams;

		// Only return an object including the URL and query params
		// instead of the entire snapshot
		return { url, queryParams };
	}
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `users` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getUsersState);
 * 	}
 * }
 * ```
 */
export const getUsersState = (state: AppState) => state.userState.users;

export const getSelectedUserState = (state: AppState) => state.userState.selectedUser;

export const getAuthenticatedState = (state: AppState) => state.globalState.isAuthenticated;

export const getAuthenticatedUserState = (state: AppState) => state.globalState.authenticatedUser;

export const getErrorState = (state: AppState) => state.globalState.error;

export const getTreeDataState = (state: AppState) => state.globalState.treeData;

