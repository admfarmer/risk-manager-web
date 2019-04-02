import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { PersonService } from '../shared/person.services';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [
    LoadingModalComponent
  ],
  exports: [
    LoadingModalComponent
  ],
  providers: [
    PersonService
  ]
})
export class DirectivesModule { }
