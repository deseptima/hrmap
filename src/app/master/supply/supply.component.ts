import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'master-supply',
  templateUrl: './supply.component.html'
})
export class SupplyComponent {
  validateForm: FormGroup;
  confirmModal: NzModalRef;
  isVisible = false
  date = null; // new Date();
  data = [
    {
      id: 1,
      supplyCode: '001',
      companyCode: '001: Soft Square International Co., Ltd.',
      branchCode: '001: สาขา รังสิต',
      supplyName: 'โต๊ะ',
      category: 'อุปกรณ์อำนวยความสะดวก'
    },
    {
      id: 2,
      supplyCode: '002',
      companyCode: '001: Soft Square International Co., Ltd.',
      branchCode: '001: สาขา รังสิต',
      supplyName: 'คอมพิวเตอร์',
      category: 'อุปกรณ์อิเล็กทรอนิกส์'
    },
  ];
  demoValue = 100;
  formatterPercent = value => `${value} %`;
  parserPercent = value => value.replace(' %', '');
  formatterDollar = value => `${value} Baht`;
  parserDollar = value => value.replace('Baht ', '');


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
      supplyName: [null, [Validators.required]],
      category: [null, [Validators.required]],
      date: [null, [Validators.required]],
      price: [0, [Validators.required]],
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
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
