import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core.module';
import toDoListComponent from '@components/pages/list/to-do-list.component';

export function tokenGetter() {
  // console.log('__tokenGetter', localStorage.getItem('jwt_token'));
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [AppComponent, toDoListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        skipWhenExpired: true,
        // headerName: 'Authorization',
        whitelistedDomains: [
          'api-local.sample-to-do-app.com',
          'www-local.sample-to-do-app.com',
        ],
        blacklistedRoutes: []
      }
    })
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
