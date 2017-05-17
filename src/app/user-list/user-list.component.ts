import { User } from './../store/users';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

	@Input()
	users: any[] = [];

	@Input()
	userForm: FormGroup;

	@Input()
	selectedUser: User;

	@Output() remove = new EventEmitter<User>();

	@Output() edit = new EventEmitter<User>();

	@Output() close = new EventEmitter();

	@Output() update = new EventEmitter<User>();

	@Output() create = new EventEmitter();

	constructor() {
	}


	onSubmit() {
		this.update.emit(this.userForm.value);
	}

	onClose() {
		this.close.emit();
	}
}
