import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiveDetailComponent } from './receive-detail/receive-detail.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    PipeModule
  ],
  declarations: [
    ReceiveDetailComponent
  ],
  exports: [
    ReceiveDetailComponent
  ]
})
export class DatagridModule { }
