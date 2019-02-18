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
  selector: 'master-supply',
  templateUrl: './supply.component.html'
})
export class SupplyComponent {
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
  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlCompany = []
  ddlBranch = []
  date = null; // new Date();
  sortName = 'resource_code';
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
      resourceid: [''],
      resourcecode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      resourcename: ['', [Validators.required]],
      resourcetype: ['', [Validators.required]],
      buydate: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      resourceid: [''],
      resourcecode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      resourcename: ['', [Validators.required]],
      resourcetype: ['', [Validators.required]],
      buydate: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.search()
  }

  submitForm(): void {
    var i: any
    for (i in this.saveForm.controls) {
      if (i != 'resourcecode') {
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
      'searchRes': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('resource', 'searchRes', search).subscribe(
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
    this.httpService.search('resource', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('resource', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
  }

  addOk(): void {
    this.addVisible = false;
    this.saveForm.controls.price.setValue(this.saveForm.controls.price.value + '')
    const save = {
      'save': this.saveForm.value
    };
    var dataSave: any
    this.httpService.save('resource', 'saveRes', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      resourceid: [''],
      resourcecode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      resourcename: ['', [Validators.required]],
      resourcetype: ['', [Validators.required]],
      buydate: ['', [Validators.required]],
      price: ['', [Validators.required]],
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
            resourceid: [''],
            resourcecode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            resourcename: ['', [Validators.required]],
            resourcetype: ['', [Validators.required]],
            buydate: ['', [Validators.required]],
            price: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.addVisible = false;
      this.saveForm = this.fb.group({
        resourceid: [''],
        resourcecode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        resourcename: ['', [Validators.required]],
        resourcetype: ['', [Validators.required]],
        buydate: ['', [Validators.required]],
        price: ['', [Validators.required]],
      });
    }
  }

  editModal(id?: any) {
    this.editVisible = !this.editVisible
    var data = this.displayData.filter(a => a.resource_id == id)
    this.editForm.controls.resourceid.setValue(data[0].resource_id)
    this.editForm.controls.resourcecode.setValue(data[0].resource_code)
    this.editForm.controls.resourcename.setValue(data[0].resource_name)
    this.editForm.controls.resourcetype.setValue(data[0].resource_type)
    this.editForm.controls.buydate.setValue(data[0].buy_date)
    this.editForm.controls.price.setValue(data[0].price)
    this.editForm.controls.branchcode.setValue(data[0].branch_code)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    var dataSave: any
    this.httpService.search('resource', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('resource', 'ddlBranch', {}).subscribe(
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
    this.httpService.save('resource', 'saveRes', save).subscribe(
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
            resourceid: [''],
            resourcecode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            resourcename: ['', [Validators.required]],
            resourcetype: ['', [Validators.required]],
            buydate: ['', [Validators.required]],
            price: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.editVisible = false;
      this.editForm = this.fb.group({
        resourceid: [''],
        resourcecode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        resourcename: ['', [Validators.required]],
        resourcetype: ['', [Validators.required]],
        buydate: ['', [Validators.required]],
        price: ['', [Validators.required]],
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
    this.httpService.delete('resource', 'deleteresource', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
