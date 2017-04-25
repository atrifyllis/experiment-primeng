export interface State {
	users: User[];
	selectedUser?: User;
}

export interface User {
	$key: string;
	username: string;
	email: string;
}
