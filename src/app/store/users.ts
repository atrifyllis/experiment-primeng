export interface State {
	users: User[];
}

export interface User {
	id: number;
	username: string;
	email: string;
}
