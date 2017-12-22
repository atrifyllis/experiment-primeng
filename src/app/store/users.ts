export interface State {
	users: User[];
	selectedUser?: User;
}

// TODO improve structure
interface Link {
	self: {
		href: string;
	};
}

export enum RoleType {
	ROLE_ADMIN = 'Administrator',
	ROLE_USER = 'User',
	ROLE_ACTUATOR = 'Actuator'
}

export interface User {
	_links?: Link;
	username: string;
	email?: string;
	roles: RoleType[];
	password?: string;
	confirmPassword?: string;
}
