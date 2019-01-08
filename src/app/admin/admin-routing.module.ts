import { MachineNewComponent } from './machine-new/machine-new.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductNewComponent } from './product-new/product-new.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'product-new', component: ProductNewComponent },
      { path: 'machines', component: MachineNewComponent },
      { path: 'machine-new', component: MachineNewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
