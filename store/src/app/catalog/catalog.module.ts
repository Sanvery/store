import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CatalogComponent } from './catalog/catalog.component';
import { PipesModule } from 'pipes-module';
import { FormsModule } from '@angular/forms';

import {
  DxTextBoxModule, DxTileViewModule, DxLoadPanelModule, DxButtonModule,
  DxToolbarModule, DxDrawerModule, DxSelectBoxModule, DxCheckBoxModule, DxListModule, DxRangeSelectorModule,
  DxDataGridModule
} from 'devextreme-angular';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgHighlightModule } from 'ngx-text-highlight';

@NgModule({
  declarations: [
    CatalogComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    DxTextBoxModule,
    DxTileViewModule,
    DxLoadPanelModule,
    DxToolbarModule,
    DxDrawerModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxListModule,
    DxRangeSelectorModule,
    DxButtonModule,
    PipesModule,
    FormsModule,
    NgHighlightModule,
    DxDataGridModule
  ],
  providers: [],
  bootstrap: [CatalogComponent]
})
export class CatalogModule { }
