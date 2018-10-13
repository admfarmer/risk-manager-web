import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'setting', component: SettingComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
