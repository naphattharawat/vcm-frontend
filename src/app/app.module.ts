import { AlertService } from './alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
// import { ServiceManagerModule } from './service-manager/service-manager.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';;
import { AdminModule } from './admin/admin.module';
// import { AuthHttp } from 'angular2-jwt';
export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    // ProductsComponent,
    // AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AuthModule,
    LoginModule,
    AdminModule,
    HttpClientModule,
    AuthModule
    // CustomersModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
