import { User } from './../store/users';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	@Input()
	users: User[] = [];

	@Output() remove = new EventEmitter<User>();

	constructor() {}

	ngOnInit() {
	}

}
