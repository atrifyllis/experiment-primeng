import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { User } from './../../store/users';

@Component({
	selector: 'form-dialog',
	templateUrl: './form-dialog.component.html',
	styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit, OnChanges  {


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
	selectedUser: User;

	@Input()
	userForm: FormGroup;

	@Output() update = new EventEmitter<User>();

	@Output() close = new EventEmitter();

	constructor() { }

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
