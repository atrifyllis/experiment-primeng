import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Store} from '@ngrx/store';
import {getTreeDataState} from '../store/reducer-config';
import {Observable} from 'rxjs/Observable';
import {TreeNode} from 'primeng/primeng';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private treeData$: Observable<TreeNode[]>;
	selectedTreeData: TreeNode[];

	constructor(private oauthService: OAuthService, private store: Store<any>) {
	}

	ngOnInit() {
		this.treeData$ = this.store.select(getTreeDataState).map(data => JSON.parse(JSON.stringify(data)));
	}

	login() {
		this.oauthService.initImplicitFlow();
	}
}
