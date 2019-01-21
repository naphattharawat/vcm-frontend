import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToThDatePipe } from './to-th-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToThDatePipe
  ],
  exports: [
    ToThDatePipe
  ]
})
export class PipeModule { }
