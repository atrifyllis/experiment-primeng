import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { userFormInit } from './../user-list-container.component';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { FormDialogComponent } from './form-dialog.component';

describe('FormDialogComponent', () => {
	let component: FormDialogComponent;
	let fixture: ComponentFixture<FormDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormDialogComponent],
			imports: [
				ReactiveFormsModule,
				DialogModule,
				MaterialModule,
				NoopAnimationsModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormDialogComponent);
		component = fixture.componentInstance;
		component.userForm = new FormBuilder().group(userFormInit);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Form Validation', () => {
		it('should mark form as valid', () => {
			updateForm('valid-username', 'valid@email.com');

			expect(component.userForm.get('username').valid).toBeTruthy();
			expect(component.userForm.get('email').valid).toBeTruthy();
		});

		it('should mark form as invalid when missing required fields', () => {
			updateForm('', '');

			expect(component.userForm.get('username').valid).toBeFalsy();
			expect(component.userForm.get('email').valid).toBeFalsy();
		});

		it('should mark form as invalid when username is too short', () => {
			updateForm('a', 'valid@email.com');

			expect(component.userForm.get('username').valid).toBeFalsy();
			expect(component.userForm.get('email').valid).toBeTruthy();
		});

		it('should mark form as invalid when email is invalid', () => {
			updateForm('valid-username', 'invalid-email');

			expect(component.userForm.get('username').valid).toBeTruthy();
			expect(component.userForm.get('email').valid).toBeFalsy();
		});
	});


	function updateForm(username, email) {
		component.userForm.setValue({
			username,
			email
		});
	}
});
