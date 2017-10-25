import {User} from './users';

export interface State {
	isAuthenticated: boolean;
	authenticatedUser: User;
}
