import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

export function AtLeastOneCheckedValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors => {
		const checkedCheckboxes = (control as FormArray).controls.length;
		return checkedCheckboxes <= 0 ? {'checkboxes': true} : null;
	};
}
