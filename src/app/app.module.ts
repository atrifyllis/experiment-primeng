import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DialogModule } from 'primeng/components/dialog/dialog';

import { UserListResolver } from './user-list/user-list.resolver';
import { UserService } from './user-list/user.service';
import { UserListEffects } from './user-list/user-list.effects';
import { UserListContainerComponent } from './user-list/user-list-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducer-config';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { routes } from './app.routes';
import { MdButtonModule, MdCardModule, MdIconModule, MdToolbarModule, MdInputModule, MdListModule } from '@angular/material';
/**
 * used by material
 */
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { FormDialogComponent } from './user-list/form-dialog/form-dialog.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RedirectInterceptor} from './interceptor/interceptor-redirect-response';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AddBearerHeaderInterceptor} from './interceptor/interceptor-add-bearer-header-request';

export const firebaseConfig = {
	apiKey: 'AIzaSyDwm6InT6RSSJ9eeU4jn0ARiYs7AMTFbO4',
	authDomain: 'experiment-primeng.firebaseapp.com',
	databaseURL: 'https://experiment-primeng.firebaseio.com',
	projectId: 'experiment-primeng',
	storageBucket: 'experiment-primeng.appspot.com',
	messagingSenderId: '980944123988'
};


@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		UserListContainerComponent,
		HomeComponent,
		FormDialogComponent
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
		StoreModule.provideStore(reducer),
		MdButtonModule, MdCardModule, MdIconModule, MdToolbarModule, MdInputModule, MdListModule,
		FlexLayoutModule,

		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,

		/**
		 * @ngrx/router-store keeps router state up-to-date in the store and uses
		 * the store as the single source of truth for the router's state.
		 */
		RouterStoreModule.connectRouter(),

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
		StoreDevtoolsModule.instrumentOnlyWithExtension(),

		/**
		 * EffectsModule.run() sets up the effects class to be initialized
		 * immediately when the application starts.
		 *
		 * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
		 */
		EffectsModule.run(UserListEffects),
		HttpClientModule,
		OAuthModule.forRoot()
	],
	providers: [
		UserService,
		UserListResolver,
		// { provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AddBearerHeaderInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}


