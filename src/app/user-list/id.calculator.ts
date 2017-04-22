import { User } from './../store/users';

export function calculateNewId(users: User[]): number {
	return Math.max(...users.map((user: User) => user.id)) + 1;
}
