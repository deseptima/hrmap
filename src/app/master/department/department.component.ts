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
  selector: 'master-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent {
  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlCompany = []
  ddlBranch = []
  // data = [
  //   {
  //     id: 1,
  //     departmentCode: '001',
  //     companyCode: '001: Soft Square International Co., Ltd.',
  //     branchCode: '001: สาขา รังสิต',
  //     name: 'Java Application',
  //     active: true,
  //   }
  // ];

  sortName = 'dep_code';
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
      depid: [''],
      depcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depname: ['', [Validators.required]],
      depactive: ['true', [Validators.required]],
    });
    this.editForm = this.fb.group({
      depid: [''],
      depcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depname: ['', [Validators.required]],
      depactive: ['true', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.search()
  }

  submitForm(): void {
    var i: any
    for (i in this.saveForm.controls) {
      if (i != 'depcode') {
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
      'searchDep': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('department', 'searchDep', search).subscribe(
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
    this.httpService.search('department', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('department', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
  }

  addOk(): void {
    this.addVisible = false;
    this.saveForm.controls.depactive.setValue(this.saveForm.controls.depactive.value + '')
    const save = {
      'save': this.saveForm.value
    };
    var dataSave: any
    this.httpService.save('department', 'saveDep', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      depid: [''],
      depcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depname: ['', [Validators.required]],
      depactive: ['true', [Validators.required]],
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
            depid: [''],
            depcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depname: ['', [Validators.required]],
            depactive: ['true', [Validators.required]],
          });
        }
      });
    } else {
      this.addVisible = false;
      this.saveForm = this.fb.group({
        depid: [''],
        depcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depname: ['', [Validators.required]],
        depactive: ['true', [Validators.required]],
      });
    }
  }

  editModal(id?: any) {
    this.editVisible = !this.editVisible
    var data = this.displayData.filter(a => a.dep_id == id)
    this.editForm.controls.depid.setValue(data[0].dep_id)
    this.editForm.controls.depcode.setValue(data[0].dep_code)
    this.editForm.controls.depname.setValue(data[0].dep_name)
    this.editForm.controls.depactive.setValue(data[0].dep_active)
    this.editForm.controls.branchcode.setValue(data[0].branch_code)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    var dataSave: any
    this.httpService.search('department', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('department', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
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
    this.httpService.save('department', 'saveDep', save).subscribe(
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
            depid: [''],
            depcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depname: ['', [Validators.required]],
            depactive: ['true', [Validators.required]],
          });
        }
      });
    } else {
      this.editVisible = false;
      this.editForm = this.fb.group({
        depid: [''],
        depcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depname: ['', [Validators.required]],
        depactive: ['true', [Validators.required]],
      });
    }
  }

  delete(id: any) {
    console.log(id);
    var data = this.displayData.filter(a => a.dep_id == id)
    this.editForm.controls.depid.setValue(data[0].dep_id + '')
    console.log(data);

    var delete_id = {
      'delete': this.editForm.value
    };
    var dataSave: any
    this.httpService.delete('department', 'deleteDep', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
