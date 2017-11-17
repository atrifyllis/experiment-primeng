import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {RoleType, User} from './../../store/users';
import {AtLeastOneCheckedValidator} from './at-least-one-checked.validator';

@Component({
	selector: 'form-dialog',
	templateUrl: './form-dialog.component.html',
	styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit, OnChanges {

	@ViewChild('userDialogForm') userDialogForm: ElementRef;

	roleTypeEnum = RoleType;
	roleTypes: any[];

	formErrors = {
		'username': '',
		'email': '',
		'roles': ''
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
		},
		'roles': {
			'checkboxes': 'At least one role is required.'
		}
	};

	@Input()
	selectedUser: User | null;

	@Input()
	userForm: FormGroup;

	@Output() update = new EventEmitter<User>();

	@Output() close = new EventEmitter();


	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.roleTypes = Object.keys(this.roleTypeEnum);
		this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	ngOnChanges() {
		this.userForm.reset(this.selectedUser !== null ? this.selectedUser : {});
		if (this.selectedUser != null) {
			this.userForm.setControl('roles', this.fb.array(this.selectedUser.roles, AtLeastOneCheckedValidator()));
		}
	}

	onSubmit() {
		this.update.emit(this.userForm.value);
		// resetting the native element is needed because angular material does not reset the error classes on submit (Why God)
		this.userDialogForm.nativeElement.reset();
	}

	onValueChanged(data?: any) {
		if (!this.userForm) {
			return;
		}
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

	isChecked(roleType) {
		const selectedRoles = this.userForm.controls.roles as FormArray;
		return selectedRoles.controls.find(role => role.value !== null && role.value === roleType);
	}

	updateRoles(roleType: RoleType, $event: Event) {
		const selectedRoles = this.userForm.controls.roles as FormArray;
		// must manually mark dirty because the form array is not considered dirty if one of its controls is dirty....... why angular???
		selectedRoles.markAsDirty();
		if (event.target['checked']) {
			selectedRoles.push(new FormControl(roleType));
		} else {
			const indexOfSelected = selectedRoles.controls.findIndex(role => role.value === roleType);
			selectedRoles.removeAt(indexOfSelected);
		}
	}
}
