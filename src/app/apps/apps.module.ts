import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { PersonService } from '../shared/person.services';
import { AuthGuardService } from '../shared/auth-guard.service';
import { IncidentService } from 'src/app/shared/incident.service'
import { DepartService } from 'src/app/shared/depart.service'
import { LevelService } from 'src/app/shared/level.service';
import { AccountService } from 'src/app/shared/account.service';
import { SideService } from 'src/app/shared/side.service';
import { SafetyService } from 'src/app/shared/safety.service';
import { TypeService } from 'src/app/shared/type.service';
import { NotypeService } from 'src/app/shared/notype.service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppsRoutingModule } from './apps-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from "angular-6-datatable";
import { GrdFilterPipe } from '../shared/grd-filter.pipe';
import { CustomerComponent } from './setting/customer/customer.component';
import { IncidentComponent } from './incident/incident.component';
import { UsersComponent } from './setting/users/users.component';
import { LevelComponent } from './setting/level/level.component';
import { AccountComponent } from './setting/account/account.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    DataTableModule,
    ClipboardModule,
    CountdownModule,
    AppsRoutingModule,
    ClarityModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'incident', component: IncidentComponent }
    ])
  ],
  providers: [
    AuthGuardService,
    PersonService,
    IncidentService,
    DepartService,
    LevelService,
    AccountService,
    SideService,
    SafetyService,
    TypeService,
    NotypeService,

  ],
  declarations: [
    LayoutComponent,
    GrdFilterPipe,
    CustomerComponent,
    IncidentComponent,
    UsersComponent,
    LevelComponent,
    AccountComponent
  ]
})

export class AppsModule { }
