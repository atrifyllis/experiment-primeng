import { User } from './../store/users';
import { Component, OnInit, Input } from '@angular/core';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUsers from '../store/users';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	@Input()
	users: User[] = [];

	constructor() {}

	ngOnInit() {
	}

}
