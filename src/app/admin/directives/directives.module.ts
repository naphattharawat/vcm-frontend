import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { SearchLabelerComponent } from './search-labeler/search-labeler.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  declarations: [
    SearchProductsComponent,
    SearchLabelerComponent
  ],
  exports:[
    SearchProductsComponent,
    SearchLabelerComponent
  ]
})
export class DirectivesModule { }
