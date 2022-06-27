import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';

import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule
  ],
  providers: [],
  bootstrap: [OrderComponent]
})
export class OrderModule { }
