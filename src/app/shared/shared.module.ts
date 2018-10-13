import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [AlertService],
  // exports: [AlertService]
})
export class SharedModule { }
