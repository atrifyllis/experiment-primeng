export interface State {
	users: User[];
	selectedUser?: User;
}

export interface User {
	id: number;
	username: string;
	email: string;
}
