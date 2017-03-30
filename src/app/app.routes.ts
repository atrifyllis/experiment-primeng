import { UserListResolver } from './user-list/user-list.resolver';
import { UserListContainerComponent } from './user-list/user-list-container.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'users',
		component: UserListContainerComponent,
		canActivate: [UserListResolver]
	}
];
