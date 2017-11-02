import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
// import { MaterialModule } from '@angular/material';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatToolbarModule,
	MatCheckboxModule
} from '@angular/material';
import {OAuthService} from 'angular-oauth2-oidc';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	const oauthServiceStub = {

	};
	beforeEach(async(() => {

		TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [
				// MaterialModule
				MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatListModule, MatCheckboxModule
			],
			providers:    [ {provide: OAuthService, useValue: oauthServiceStub } ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
