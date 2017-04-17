import { User } from './../store/users';
import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

	@Input()
	users: User[] = [];

	@Input()
	userForm: FormGroup;

	@Input()
	selectedUser: User;

	@Output() remove = new EventEmitter<User>();

	@Output() edit = new EventEmitter<User>();

	@Output() close = new EventEmitter();

	@Output() update = new EventEmitter<User>();

	constructor() {

	}

	ngOnInit() {
	}

	ngOnChanges() {
			this.userForm.reset(this.selectedUser !== null ? this.selectedUser : {});
	}

	onSubmit() {
		const newUser = this.userForm.value;
		this.update.emit(newUser);
	}

}
