import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State 	extends EntityState<User> {
	selectedUser?: User;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sort option whether to sort the records when performing
 * operations
 */
export const userEntityAdapter: EntityAdapter<User> = createEntityAdapter<User>({
	selectId: (user: User) => user._links.self.href,
	sortComparer: false,
});

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
	selectIds: selectUserIds,
	selectEntities: selectUserEntities,
	selectAll: selectAllUsers,
	selectTotal: usersCount
} = userEntityAdapter.getSelectors();

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
