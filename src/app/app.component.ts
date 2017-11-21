import {Component, EventEmitter, Input, Output} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import {User} from './store/users';

@Component({
	selector: 'app-component',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'
	]
})
export class AppComponent {
	title = 'PrimeNG/Ngrx/Material integrated';

	@Input()
	isAuthenticated: boolean;

	@Input()
	authenticatedUser: User | null;

	@Output() login = new EventEmitter();

	@Output() logout = new EventEmitter();

	constructor() {

	}
}
