import {State} from './store/global';
import * as app from './app.actions';
import {TreeNode} from 'primeng/primeng';

export const initialState: State = {
	isAuthenticated: false,
	authenticatedUser: null,
	error: null,
	treeData: null
};

export function appReducer(state: State = initialState, action: app.Actions): State {
	switch (action.type) {
		case app.ActionTypes.LOGIN_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: true, treeData: [
				{
					label: 'label1up',
					data: 'data1ip',
					children: [
						{
							label: 'label2up',
							data: 'data2up'
						}
					]
				}
			]});
		}
		case app.ActionTypes.LOGOUT_SUCCESS: {
			return Object.assign({}, state, {isAuthenticated: false, authenticatedUser: null, treeData: [
				{
					label: 'label1up',
					data: 'data1ip',
					children: [
						{
							label: 'label2up',
							data: 'data2up'
						}
					]
				}
			] })
		}
		case app.ActionTypes.GET_USER_INFO_SUCCESS: {
			const authenticatedUser = action.payload;
			return Object.assign({}, state, {authenticatedUser, treeData: [
					{
						label: 'label1',
						data: 'data1',
						children: [
							{
								label: 'label2',
								data: 'data2'
							}
						]
					}
				]});
		}
		case app.ActionTypes.ERROR: {
			return Object.assign({}, state, {error: action.payload});
		}
		default: {
			return state;
		}
	}
}
