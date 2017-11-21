import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function FieldValuesMatchValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors => {
		const form = control as FormGroup;
		const password = form.get('password');
		const confirmPassword = form.get('confirmPassword');
		if (password.value || confirmPassword.value) {
			return password.value !== confirmPassword.value ? {'password': 'match'} : null;
		}
	};
}
