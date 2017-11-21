import {appReducer, initialState} from './app.reducer';
import {ErrorAction, GetUserInfoSuccessAction, LoginSuccessAction, LogoutSuccessAction} from './app.actions';
import {sampleUsers} from './store/sampleData';
import * as deepFreeze from 'deep-freeze-strict';

describe('AppReducer', () => {

	describe('undefined action', () => {
		it('should return the default state', () => {
			const newState = deepFreeze(initialState);
			const action = {} as any;
			const result = appReducer(undefined, action);
			expect(result).toEqual(newState);
		});
	});

	describe('Successful login', () => {
		it('should change the state to authenticated', () => {
			const newState = deepFreeze(initialState);
			const action = new LoginSuccessAction();
			const result = appReducer(newState, action);
			expect(result.isAuthenticated).toBeTruthy();
		});
	});

	describe('Successful logout', () => {
		it('should change the state to unauthenticated', () => {
			const newState = deepFreeze(initialState);
			const action = new LogoutSuccessAction();
			const result = appReducer(newState, action);
			expect(result.isAuthenticated).toBeFalsy();
		});
	});

	describe('Retrieve user info', () => {
		it('should set user info in state', () => {
			const sampleUser = deepFreeze(sampleUsers[0]);
			const newState = deepFreeze(initialState);
			const action = new GetUserInfoSuccessAction(sampleUser);
			const result = appReducer(newState, action);
			expect(result.authenticatedUser).toEqual(sampleUser);
		});
	});

	describe('Error occured', () => {
		it('should set error in state', () => {
			const error = deepFreeze({error: 'error message'});
			const newState = deepFreeze(initialState);
			const action = new ErrorAction(error);
			const result = appReducer(newState, action);
			expect(result.error).toEqual(error);
		});
	});

});
