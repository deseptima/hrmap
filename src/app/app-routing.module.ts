import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from './layout/route.service'
import { ReportComponent } from './report/report.component';
import { MasterModule } from './master/master.module'

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  Route.normalLayout([
    { path: 'calendar', component: CalendarComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'report', component: ReportComponent },
    { path: 'master', loadChildren: () => MasterModule },
  ]),
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
