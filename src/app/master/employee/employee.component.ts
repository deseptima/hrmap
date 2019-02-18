import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzModalRef, NzModalService, END } from 'ng-zorro-antd';
import { HttpService } from 'src/app/service/http-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'master-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  data = [
    {
      id: 1,
      employeeCode: '001',
      teamCode: '001: พี่บอย',
      companyCode: '001: Soft Square International Co., Ltd.',
      branchCode: '001: สาขา รังสิต',
      departmentCode: '001: Java Application',
      name: 'เก่ง ธชย',
      position: 'Trainee'
    },
    {
      id: 2,
      employeeCode: '002',
      teamCode: '001: พี่บอย',
      companyCode: '001: Soft Square International Co., Ltd.',
      branchCode: '001: สาขา รังสิต',
      departmentCode: '001: Java Application',
      name: 'พี่ณัฐ จ้าจ้า',
      position: 'Trainee'
    },
  ];

  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlCompany = []
  ddlBranch = []
  ddlDep = []
  ddlTeam = []
  sortName = 'emp_code';
  sortValue = 'ascend';
  displayData = []

  constructor(private fb: FormBuilder, private modal: NzModalService,
    private httpService: HttpService,
    private router: Router, ) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') == 'dev') {
      this.router.navigateByUrl('/calendar')
    }
    this.saveForm = this.fb.group({
      empid: [''],
      empcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamcode: ['', [Validators.required]],
      empname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      empaddress: ['', [Validators.required]],
      empemail: ['', [Validators.required, Validators.email]],
      empphone: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      empid: [''],
      empcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamcode: ['', [Validators.required]],
      empname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      empaddress: ['', [Validators.required]],
      empemail: ['', [Validators.required, Validators.email]],
      empphone: ['', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.search()
  }

  submitForm(): void {
    var i: any
    for (i in this.saveForm.controls) {
      if (i != 'teamcode') {
        this.saveForm.controls[i].markAsDirty();
        this.saveForm.controls[i].updateValueAndValidity();
      } else {
        this.saveForm.markAsPristine();
        this.saveForm.markAsUntouched();
      }
    }
    for (const i in this.searchForm.controls) {
      this.searchForm.controls[i].markAsDirty();
      this.searchForm.controls[i].updateValueAndValidity();
    }
  }

  sort(sort: { key: string, value: string }): void {
    console.log(sort.key + ',' + sort.value)
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.searchAction();
  }

  search() {
    const search = {
      'searchEmp': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('employee', 'searchEmp', search).subscribe(
      res => {
        dataSearch = res
        console.log(dataSearch.data.records);
        this.displayData = []
        if (dataSearch.data.records) {
          for (var i = 0; i < dataSearch.data.records.length; i++) {
            this.displayData[i] = dataSearch.data.records[i]
          }
          this.searchAction();
        }
      }
    );
  }

  searchAction(): void {
    var data = this.displayData
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  addModal() {
    this.addVisible = !this.addVisible
    const save = {
      'save': this.saveForm.value
    };
    var dataSave: any
    this.httpService.search('employee', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlDep', {}).subscribe(
      res => {
        dataSave = res
        this.ddlDep = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlTeam', {}).subscribe(
      res => {
        dataSave = res
        this.ddlTeam = dataSave.data
        console.log(dataSave);
      }
    );
  }

  addOk(): void {
    this.addVisible = false;
    const save = {
      'save': this.saveForm.value
    };
    var dataSave: any
    this.httpService.save('employee', 'saveEmp', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      empid: [''],
      empcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamcode: ['', [Validators.required]],
      empname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      empaddress: ['', [Validators.required]],
      empemail: ['', [Validators.required, Validators.email]],
      empphone: ['', [Validators.required]],
    });
  }

  addCancel(): void {
    if (this.saveForm.dirty && this.saveForm.value) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'ต้องการที่จะละทิ้งสิ่งที่กรอกไปหรือไม่?',
        nzContent: 'กดตกลงเพื่อละทิ้ง, กดยกเลิกเพื่อกลับเข้าสู่หน้าเดิม',
        nzOkText: 'ตกลง',
        nzCancelText: 'ยกเลิก',
        nzOnOk: () => {
          this.addVisible = false;
          this.saveForm = this.fb.group({
            empid: [''],
            empcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depcode: ['', [Validators.required]],
            teamcode: ['', [Validators.required]],
            empname: ['', [Validators.required]],
            position: ['', [Validators.required]],
            empaddress: ['', [Validators.required]],
            empemail: ['', [Validators.required, Validators.email]],
            empphone: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.addVisible = false;
      this.saveForm = this.fb.group({
        empid: [''],
        empcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depcode: ['', [Validators.required]],
        teamcode: ['', [Validators.required]],
        empname: ['', [Validators.required]],
        position: ['', [Validators.required]],
        empaddress: ['', [Validators.required]],
        empemail: ['', [Validators.required, Validators.email]],
        empphone: ['', [Validators.required]],
      });
    }
  }

  editModal(id?: any) {
    this.editVisible = !this.editVisible
    var data = this.displayData.filter(a => a.emp_id == id)
    console.log(data);

    this.editForm.controls.empid.setValue(data[0].emp_id)
    this.editForm.controls.empcode.setValue(data[0].emp_code)
    this.editForm.controls.branchcode.setValue(data[0].branch_code)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    this.editForm.controls.depcode.setValue(data[0].dep_code)
    this.editForm.controls.teamcode.setValue(data[0].team_code)
    this.editForm.controls.empname.setValue(data[0].emp_name)
    this.editForm.controls.position.setValue(data[0].emp_position)
    this.editForm.controls.empaddress.setValue(data[0].emp_address)
    this.editForm.controls.empemail.setValue(data[0].emp_email)
    this.editForm.controls.empphone.setValue(data[0].emp_phone)
    var dataSave: any
    this.httpService.search('employee', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlDep', {}).subscribe(
      res => {
        dataSave = res
        this.ddlDep = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('employee', 'ddlTeam', {}).subscribe(
      res => {
        dataSave = res
        this.ddlTeam = dataSave.data
        console.log(dataSave);
      }
    );
  }

  editOk(): void {
    console.log(this.editForm.value);

    this.editVisible = false;
    const save = {
      'save': this.editForm.value
    };
    var dataSave: any
    this.httpService.save('employee', 'saveEmp', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

  editCancel(): void {
    if (this.editForm.dirty && this.editForm.value) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'ต้องการที่จะละทิ้งสิ่งที่กรอกไปหรือไม่?',
        nzContent: 'กดตกลงเพื่อละทิ้ง, กดยกเลิกเพื่อกลับเข้าสู่หน้าเดิม',
        nzOkText: 'ตกลง',
        nzCancelText: 'ยกเลิก',
        nzOnOk: () => {
          this.editVisible = false;
          this.editForm = this.fb.group({
            empid: [''],
            empcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depcode: ['', [Validators.required]],
            teamcode: ['', [Validators.required]],
            empname: ['', [Validators.required]],
            position: ['', [Validators.required]],
            empaddress: ['', [Validators.required]],
            empemail: ['', [Validators.required, Validators.email]],
            empphone: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.editVisible = false;
      this.editForm = this.fb.group({
        empid: [''],
        empcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depcode: ['', [Validators.required]],
        teamcode: ['', [Validators.required]],
        empname: ['', [Validators.required]],
        position: ['', [Validators.required]],
        empaddress: ['', [Validators.required]],
        empemail: ['', [Validators.required, Validators.email]],
        empphone: ['', [Validators.required]],
      });
    }
  }

  delete(id: any) {
    console.log(id);
    var data = this.displayData.filter(a => a.emp_id == id)
    this.editForm.controls.empid.setValue(data[0].emp_id + '')
    console.log(data);

    var delete_id = {
      'delete': this.editForm.value
    };
    var dataSave: any
    this.httpService.delete('employee', 'deleteEmp', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
