import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';

import { DxTextBoxModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    DxTextBoxModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
