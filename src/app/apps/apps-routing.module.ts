import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { UsersComponent } from './setting/users/users.component';
import { CustomerComponent } from './setting/customer/customer.component';
import { IncidentComponent } from './incident/incident.component';
import { LevelComponent } from './setting/level/level.component';
import { AccountComponent } from './setting/account/account.component'

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'level', component: LevelComponent },
      { path: 'incident', component: IncidentComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'incident', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
