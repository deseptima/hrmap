import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { BranchComponent } from './branch/branch.component'
import { CompanyComponent } from './company/company.component'
import { DepartmentComponent } from './department/department.component'
import { EmployeeComponent } from './employee/employee.component'
import { TeamComponent } from './team/team.component'

// routedComponents

export const router: Routes = [
  { path: 'branch', component: BranchComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'team', component: TeamComponent },
  // { path: '**', redirectTo: 'account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
