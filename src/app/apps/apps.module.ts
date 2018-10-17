import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesService } from '../shared/leave.services';
import { AuthGuardService } from '../shared/auth-guard.service';

import { AppsRoutingModule } from './apps-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClarityModule } from '@clr/angular';
import { SettingComponent } from './setting/setting.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppsRoutingModule,
    ClarityModule,
    SharedModule
  ],
  providers: [AuthGuardService, LeavesService],
  declarations: [LayoutComponent, DashboardComponent, SettingComponent]
})
export class AppsModule { }
