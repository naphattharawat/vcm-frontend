import { MachinesComponent } from './machines/machines.component';
import { MachineNewComponent } from './machine-new/machine-new.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ReceivesComponent } from './receives/receives.component';
import { ReceiveNewComponent } from './receive-new/receive-new.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'product-new', component: ProductNewComponent },
      { path: 'machines', component: MachinesComponent },
      { path: 'machine-new', component: MachineNewComponent },
      { path: 'receives', component: ReceivesComponent },
      { path: 'receive-new', component: ReceiveNewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
