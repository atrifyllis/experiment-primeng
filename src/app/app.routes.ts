import { UserListResolver } from './user-list/user-list.resolver';
import { UserListContainerComponent } from './user-list/user-list-container.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'users',
		component: UserListContainerComponent,
		canActivate: [UserListResolver]
	},
	{
		path: 'error',
		component: ErrorComponent
	}
];
