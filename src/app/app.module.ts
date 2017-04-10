import { DataTableModule, SharedModule } from 'primeng/primeng';
import { UserListResolver } from './user-list/user-list.resolver';
import { UserService } from './user-list/user.service';
import { UserListEffects } from './user-list/user-list.effects';
import { UserListContainerComponent } from './user-list/user-list-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducer-config';
/**
 * storeLogger is a metareducer that logs out each time we dispatch an action.
 */

import { FieldsetModule } from 'primeng/components/fieldset/fieldset';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { routes } from './app.routes';
import { MaterialModule } from '@angular/material';
/**
 * used by material
 */
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		UserListContainerComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		FieldsetModule,
		DataTableModule,
		SharedModule,
		RouterModule.forRoot(routes),
		StoreModule.provideStore(reducer),
		MaterialModule,
		FlexLayoutModule,

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
	],
	providers: [UserService, UserListResolver],
	bootstrap: [AppComponent]
})
export class AppModule {
}


