import { MaterialModule } from '@angular/material';
import { DataTableModule } from 'primeng/primeng';

import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { sampleUsers } from '../store/sampleData';
import { User } from '../store/users';

describe('UserListComponent', () => {
	let component: UserListComponent;
	let fixture: ComponentFixture<UserListComponent>;
	let compiled: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserListComponent],
			imports: [
				DataTableModule,
				FieldsetModule,
				MaterialModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserListComponent);
		component = fixture.componentInstance;
		component.users = sampleUsers;
		compiled = fixture.debugElement.nativeElement;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should have users displaying in a table', () => {
		const headerRow = compiled.querySelector('thead tr');
		const userRows = compiled.querySelectorAll('tr.ui-widget-content');

		expect(headerRow).toBeDefined();
		expect(userRows.length).toBe(5);
	});

	it('should have action buttons displaying for each user', () => {
		const userRows = compiled.querySelectorAll('tr.ui-widget-content');
		getAllLastColumns(userRows).forEach(td => {
			const buttons = td.querySelectorAll('.material-icons');
			expect(buttons.length).toBe(2);
			expect(buttons[0].textContent).toBe('edit');
			expect(buttons[1].textContent).toBe('delete');
		});
	});

	it('should raise remove event with correct user as argument', () => {
		const userRows: any[] = compiled.querySelectorAll('tr.ui-widget-content');
		const buttons = getAllLastColumns(userRows)[0].querySelectorAll('.material-icons');
		let selectedUser: User;
		component.remove.subscribe((user: User) => selectedUser = user);
		buttons[1].click();
		expect(selectedUser.id).toBe(1);
	});
});

export function getAllLastColumns(listOfRows: any[]): any[] {
	return Array.from(listOfRows, row => row.querySelector('td:last-child'));
}
