import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartComponent } from './cart/cart.component';

import { DxDataGridModule, DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';

import { CookieService } from 'ngx-cookie-service'

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxNumberBoxModule
  ],
  providers: [CookieService],
  bootstrap: [CartComponent]
})
export class CartModule { }
