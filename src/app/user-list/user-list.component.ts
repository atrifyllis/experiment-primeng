import { User } from './../store/users';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {


	formErrors = {
		'username': '',
		'email': ''
	};

	validationMessages = {
		'username': {
			'required': 'Username is required.',
			'minlength': 'Minimum length: 4',
			'maxlength': 'Maximum length: 24'
		},
		'email': {
			'required': 'Email is required.',
			'email': 'Email is invalid.'
		}
	};

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

	ngOnInit() {
		this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	ngOnChanges() {
		this.userForm.reset(this.selectedUser !== null ? this.selectedUser : {});
	}

	onSubmit() {
		this.update.emit(this.userForm.value);
	}

	onValueChanged(data?: any) {
		if (!this.userForm) { return; }
		const form = this.userForm;
		Object.keys(this.formErrors).map(field => {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				Object.keys(control.errors).map(key => {
					this.formErrors[field] += messages[key] + ' ';
				});
			}
		});
	}
}
