import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DialogModule} from 'primeng/components/dialog/dialog';

import {UserListResolver} from './user-list/user-list.resolver';
import {UserService} from './user-list/user.service';
import {UserListEffects} from './user-list/user-list.effects';
import {UserListContainerComponent} from './user-list/user-list-container.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {CustomSerializer, metaReducers, reducers} from './store/reducer-config';
import {FieldsetModule} from 'primeng/components/fieldset/fieldset';

import {AppComponent} from './app.component';
import {UserListComponent} from './user-list/user-list.component';
import {routes} from './app.routes';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatSlideToggleModule,
	MatToolbarModule
} from '@angular/material';
/**
 * used by material
 */
import 'hammerjs';
import {HomeComponent} from './home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormDialogComponent} from './user-list/form-dialog/form-dialog.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AddBearerHeaderInterceptor} from './interceptor/interceptor-add-bearer-header-request';
import {AppEffects} from 'app/app.effects';
import {AppContainerComponent} from './app-container.component';
import {RedirectInterceptor} from './interceptor/interceptor-redirect-response';
import {ErrorComponent} from './error/error.component';
import {PermissionService} from './permission.service';


@NgModule({
	declarations: [
		AppComponent,
		AppContainerComponent,
		UserListComponent,
		UserListContainerComponent,
		HomeComponent,
		FormDialogComponent,
		ErrorComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		BrowserAnimationsModule,
		FieldsetModule,
		DataTableModule,
		DialogModule,
		RouterModule.forRoot(routes),

		/**
		 * StoreModule.forRoot is imported once in the root module, accepting a reducer
		 * function or object map of reducer functions. If passed an object of
		 * reducers, combineReducers will be run creating your application
		 * meta-reducer. This returns all providers for an @ngrx/store
		 * based application.
		 */
		StoreModule.forRoot(reducers, {metaReducers}),

		MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule,
		MatListModule, MatCheckboxModule, MatSlideToggleModule, MatMenuModule,

		FlexLayoutModule,
		/**
		 * @ngrx/router-store keeps router state up-to-date in the store and uses
		 * the store as the single source of truth for the router's state.
		 */
		StoreRouterConnectingModule,

		/**
		 * Store devtools instrument the store retaining past versions of state
		 * and recalculating new states. This enables powerful time-travel
		 * debugging.
		 *
		 * To use the debugger, install the Redux Devtools extension for either
		 * Chrome or Firefox
		 *
		 * See: https://github.com/zalmoxisus/redux-devtools-extension
		 */
		StoreDevtoolsModule.instrument(),

		/**
		 * EffectsModule.forRoot() is imported once in the root module and
		 * sets up the effects class to be initialized immediately when the
		 * application starts.
		 *
		 * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
		 */
		EffectsModule.forRoot([AppEffects, UserListEffects]),

		HttpClientModule,
		OAuthModule.forRoot()
	],
	providers: [
		UserService,
		PermissionService,
		UserListResolver,
		{provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: AddBearerHeaderInterceptor, multi: true},
		/**
		 * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
		 * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
		 * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
		 */
		{provide: RouterStateSerializer, useClass: CustomSerializer}
	],
	bootstrap: [AppContainerComponent]
})
export class AppModule {
}


