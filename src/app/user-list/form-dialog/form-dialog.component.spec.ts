import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {userFormInit} from './../user-list-container.component';
// import { MaterialModule } from '@angular/material';
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/primeng';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';


import {FormDialogComponent} from './form-dialog.component';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSlideToggleModule,
	MatToolbarModule
} from '@angular/material';
import {RoleType} from '../../store/users';

const VALID_USERNAME = 'valid-username';
const VALID_EMAIL = 'valid@email.com';
const INVALID_EMAIL = 'invalid-email';

describe('FormDialogComponent', () => {
	let component: FormDialogComponent;
	let fixture: ComponentFixture<FormDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormDialogComponent],
			imports: [
				ReactiveFormsModule,
				DialogModule,
				// MaterialModule,
				MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatListModule, MatCheckboxModule, MatSlideToggleModule,
				NoopAnimationsModule
			],
			providers: [
				FormBuilder
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormDialogComponent);
		component = fixture.componentInstance;
		component.userForm = new FormBuilder().group(userFormInit);
		component.selectedUser = {
			_links: {self: {href: '1'}},
			username: 'user1',
			email: 'mail@test.com',
			roles: [RoleType.ROLE_USER]
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Form Validation', () => {
		it('should mark form as valid', () => {
			updateForm(VALID_USERNAME, VALID_EMAIL);

			expect(component.userForm.get('username').valid).toBeTruthy();
			expect(component.userForm.get('email').valid).toBeTruthy();
		});

		it('should mark form as invalid when missing required fields', () => {
			updateForm('', '');

			expect(component.userForm.get('username').valid).toBeFalsy();
			expect(component.userForm.get('email').valid).toBeFalsy();
		});

		it('should mark form as invalid when username is too short', () => {
			updateForm('a', VALID_EMAIL);

			expect(component.userForm.get('username').valid).toBeFalsy();
			expect(component.userForm.get('email').valid).toBeTruthy();
		});

		it('should mark form as invalid when email is invalid', () => {
			updateForm(VALID_USERNAME, INVALID_EMAIL);

			expect(component.userForm.get('username').valid).toBeTruthy();
			expect(component.userForm.get('email').valid).toBeFalsy();
		});

		it('should mark form as invalid when no roles are selected', () => {
			updateForm(VALID_USERNAME, VALID_EMAIL);
			const formArray = (component.userForm.get('roles') as FormArray);
			formArray.removeAt(0);
			fixture.detectChanges();

			expect(component.userForm.get('username').valid).toBeTruthy();
			expect(component.userForm.get('email').valid).toBeTruthy();
			expect(formArray.valid).toBeFalsy();
		});
	});


	function updateForm(username, email, roles = []) {
		const formRoles = new FormArray([new FormControl(roles.join(','))]);
		component.userForm.reset({
			_links: '',
			username,
			email,
			formRoles
		});
	}
});
