import { UsersService } from './users.service';
import { LabelersService } from './labelers.service';
import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';
import { ProductsComponent } from './products/products.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ProductNewComponent } from './product-new/product-new.component';
import { MachinesComponent } from './machines/machines.component';
import { MachineNewComponent } from './machine-new/machine-new.component';
import { MachinesService } from './machines.service';
import { ReceivesComponent } from './receives/receives.component';
import { PipeModule } from '../pipe/pipe.module';
import { ReceiveNewComponent } from './receive-new/receive-new.component';
import { DatagridModule } from './datagrid/datagrid.module';
import { DirectivesModule } from './directives/directives.module';
import { CustomersComponent } from './customers/customers.component'
import { ReceiveService } from './receive.service';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { LabelersComponent } from './labelers/labelers.component';
import { LabelerNewComponent } from './labeler-new/labeler-new.component';
import { UsersComponent } from './users/users.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    AdminRoutingModule,
    PipeModule,
    DatagridModule,
    DirectivesModule
  ],
  declarations: [
    LayoutComponent,
    ProductsComponent,
    ProductNewComponent,
    MachinesComponent,
    MachineNewComponent,
    ReceivesComponent,
    ReceiveNewComponent,
    CustomersComponent,
    CustomerNewComponent,
    LabelersComponent,
    LabelerNewComponent,
    UsersComponent
  ],
  providers: [
    ProductsService,
    MachinesService,
    ReceiveService,
    CustomersService,
    LabelersService,
    UsersService
  ]
})
export class AdminModule { }
