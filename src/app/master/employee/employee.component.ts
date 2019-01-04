import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'master-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  validateForm: FormGroup;
  confirmModal: NzModalRef;
  isVisible = false
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

  sortName = null;
  sortValue = null;
  displayData = [...this.data]
  constructor(private fb: FormBuilder, private modal: NzModalService) { }

  sort(sort: { key: string, value: string }): void {
    console.log(sort.key + ',' + sort.value)
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    // const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    // const data = this.data.filter(item => filterFunc(item));
    var data = this.data
    /** sort data **/
    if (this.sortName && this.sortValue) {
      console.log('a')
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      companyCode: [null, [Validators.required]],
      branchCode: [null, [Validators.required]],
      departmentCode: [null, [Validators.required]],
      teamCode: [null, [Validators.required]],
      employeeName: [null, [Validators.required]],
      position: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    if (this.validateForm.dirty && this.validateForm.value) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'ต้องการที่จะละทิ้งสิ่งที่กรอกไปหรือไม่?',
        nzContent: 'กดตกลงเพื่อละทิ้ง, กดยกเลิกเพื่อกลับเข้าสู่หน้าเดิม',
        nzOkText: 'ตกลง',
        nzCancelText: 'ยกเลิก',
        nzOnOk: () => {
          this.isVisible = false;
          this.validateForm.reset()
        }
      });
    } else {
      this.isVisible = false;
      this.validateForm.reset()
    }
  }
}
