import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module'

import { BranchComponent } from './branch/branch.component'
import { CompanyComponent } from './company/company.component'
import { DepartmentComponent } from './department/department.component'
import { EmployeeComponent } from './employee/employee.component'
import { TeamComponent } from './team/team.component'
import { SupplyComponent } from './supply/supply.component'

@NgModule({
  declarations: [
    BranchComponent,
    CompanyComponent,
    DepartmentComponent,
    EmployeeComponent,
    TeamComponent,
    SupplyComponent,
  ],
  imports: [
    MasterRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MasterModule { }
