import {User} from './users';
import {HttpErrorResponse} from '@angular/common/http';
import {TreeNode} from 'primeng/primeng';

export interface State {
	isAuthenticated: boolean;
	authenticatedUser: User;
	error: HttpErrorResponse;
	treeData: TreeNode[];
}
