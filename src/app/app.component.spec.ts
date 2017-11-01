import { MaterialModule } from '@angular/material';
import { async, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

const title = 'PrimeNG/Ngrx/Material integrated';

describe('AppComponent', () => {
	const config: Route[] = [];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			imports: [
				RouterTestingModule.withRoutes(config),
				MaterialModule
			]
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have correct title`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual(title);
	}));
	it('should render correct title in a span tag', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('span').textContent).toContain(title);
	}));
});
