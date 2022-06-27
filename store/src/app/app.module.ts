import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { RegisterModule } from './register/register.module';

import { DxTextBoxModule, DxButtonModule, DxNavBarModule, DxPopupModule } from 'devextreme-angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './shared/app.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { CookieService } from 'ngx-cookie-service'

export function initApp(appService: AppService) {
  return () => appService.initApp();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxNavBarModule,
    HomeModule,
    CatalogModule,
    HttpClientModule,
    CartModule,
    OrderModule,
    RegisterModule,
    DxPopupModule
  ],
  providers: [
    Title,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
