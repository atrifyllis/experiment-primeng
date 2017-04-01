import { MaterialModule } from '@angular/material';
import { DataTableModule } from 'primeng/primeng';

import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { sampleUsers } from '../store/sampleData';

describe('UserListComponent', () => {
	let component: UserListComponent;
	let fixture: ComponentFixture<UserListComponent>;

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
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should have users displaying in a table', () => {
		const compiled = fixture.debugElement.nativeElement;
		const headerRow = compiled.querySelector('thead tr');
		const userRows = compiled.querySelectorAll('tr.ui-widget-content');

		expect(headerRow).toBeDefined();
		expect(userRows.length).toBe(5);
	});
});
