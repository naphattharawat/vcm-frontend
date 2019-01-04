import { ProductsService } from './products.service';
import { ProductsComponent } from './products/products.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ProductNewComponent } from './product-new/product-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    AdminRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ProductsComponent,
    ProductNewComponent
  ],
  providers: [
    ProductsService]
})
export class AdminModule { }
