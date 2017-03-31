import { MaterialModule } from '@angular/material';
import { DataTableModule } from 'primeng/primeng';

import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

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
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});
});
