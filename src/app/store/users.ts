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

export interface User {
	_links: Link;
	username: string;
	email: string;
}
