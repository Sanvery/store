import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    DxTextBoxModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
