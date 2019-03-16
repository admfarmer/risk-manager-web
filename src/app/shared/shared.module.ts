import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AuthGuardService } from './auth-guard.service';
import { LoginService } from './login.service';
import { UsernameService } from './username.service';
import { LevelService } from './level.service'
import { AccountService } from './account.service'
import { PersonService } from './person.services'
import { IncidentService } from './incident.service'
import { SideService } from 'src/app/shared/side.service';
import { SafetyService } from 'src/app/shared/safety.service';
import { TypeService } from 'src/app/shared/type.service';
import { NotypeService } from 'src/app/shared/notype.service';

import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ModalAddLevelComponent } from './modal-add-level/modal-add-level.component';
import { ModalAddCustomerComponent } from './modal-add-customer/modal-add-customer.component';
import { ModalAddIncidentComponent } from './modal-add-incident/modal-add-incident.component';
import { ModalAddAccountComponent } from './modal-add-account/modal-add-account.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [
    ModalAddUserComponent,
    ModalAddCustomerComponent,
    ModalAddIncidentComponent,
    ModalAddLevelComponent,
    ModalAddAccountComponent,
  ],
  exports: [
    ModalAddUserComponent,
    ModalAddCustomerComponent,
    ModalAddIncidentComponent,
    ModalAddLevelComponent,
    ModalAddAccountComponent,
  ],
  providers: [
    AuthGuardService,
    LoginService,
    UsernameService,
    LevelService,
    AccountService,
    PersonService,
    IncidentService,
    SideService,
    SafetyService,
    TypeService,
    NotypeService,
  ]
})
export class SharedModule { }
