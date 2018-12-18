import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { Route } from './layout/route.service'
import { ReportComponent } from './report/report.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  Route.normalLayout([
    { path: 'calendar', component: CalendarComponent },
    { path: 'table', component: TableComponent },
    { path: 'report', component: ReportComponent },
  ]),
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
