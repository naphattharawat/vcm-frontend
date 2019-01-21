import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  declarations: [
    SearchProductsComponent
  ],
  exports:[
    SearchProductsComponent
  ]
})
export class DirectivesModule { }
