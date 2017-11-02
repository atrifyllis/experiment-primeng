import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getErrorState} from '../store/reducer-config';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
	selector: 'error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

	error$: Observable<HttpErrorResponse>;

	constructor(private store: Store<AppState>) {
		this.error$ = store.select(getErrorState);
	}

	ngOnInit() {
	}

}
