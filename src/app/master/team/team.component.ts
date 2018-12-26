import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'master-team',
  templateUrl: './team.component.html'
})
export class TeamComponent {
  validateForm: FormGroup;
  confirmModal: NzModalRef;
  isVisible = false
  data = [
    {
      id: 1,
      teamCode: '001',
      companyCode: '001: Soft Square International Co., Ltd.',
      branchCode: '001: สาขา รังสิต',
      departmentCode: '001: Java Application',
      name: 'ทีมพี่บอย',
      teamLeader: 'พี่บอย'
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
      id: ['002'],
      companyCode: [null, [Validators.required]],
      branchCode: [null, [Validators.required]],
      departmentCode: [null, [Validators.required]],
      teamName: [null, [Validators.required]],
      teamLeaderName: [null, [Validators.required]],
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
        nzTitle: 'Do you Want to discard these items?',
        nzContent: 'When clicked the OK button, all items will be discarded',
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
