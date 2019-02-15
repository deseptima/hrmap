import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzModalRef, NzModalService, END } from 'ng-zorro-antd';
import { HttpService } from 'src/app/service/http-service.service';

@Component({
  selector: 'master-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent {
  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  data = [
    {
      id: 1,
      company_code: '001',
      company_name: 'Soft Square International Co., Ltd.',
      company_address: '51/597 หมู่ 7 ตำบล หลักหก อำเภอ เมือง จังหวัด ปทุมธานี'
    }
  ];

  sortName = 'company_code';
  sortValue = 'ascend';
  displayData = []

  constructor(private fb: FormBuilder, private modal: NzModalService,
    private httpService: HttpService, ) { }

  ngOnInit(): void {
    this.saveForm = this.fb.group({
      companyid: [''],
      companyname: ['', [Validators.required]],
      companyaddress: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      companyid: [''],
      companyname: ['', [Validators.required]],
      companyaddress: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.search()
  }

  submitForm(): void {
    // console.log(this.saveForm.controls);
    // console.log(this.saveForm.controls.companycode);
    var i: any
    for (i in this.saveForm.controls) {
      if (i != 'companycode') {
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
      'searchCompany': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('company', 'searchCompany', search).subscribe(
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
  }

  addOk(): void {
    this.addVisible = false;
    const save = {
      'save': this.saveForm.value
    };
    var dataSave: any
    this.httpService.save('company', 'saveCompany', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      companyid: [''],
      companyname: ['', [Validators.required]],
      companyaddress: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
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
          this.saveForm.reset()
        }
      });
    } else {
      this.addVisible = false;
      this.saveForm.reset()
    }
  }

  editModal(id?: any) {
    this.editVisible = !this.editVisible
    var data = this.displayData.filter(a => a.company_id == id)
    this.editForm.controls.companyid.setValue(data[0].company_id)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    this.editForm.controls.companyname.setValue(data[0].company_name)
    this.editForm.controls.companyaddress.setValue(data[0].company_address)
  }

  editOk(): void {
    console.log(this.editForm.value);

    this.editVisible = false;
    const save = {
      'save': this.editForm.value
    };
    var dataSave: any
    this.httpService.save('company', 'saveCompany', save).subscribe(
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
          this.editForm.reset()
        }
      });
    } else {
      this.editVisible = false;
      this.editForm.reset()
    }
  }

  delete(id: any) {
    console.log(id);
    var data = this.displayData.filter(a => a.company_id == id)
    this.editForm.controls.companyid.setValue(data[0].company_id + '')
    console.log(data);

    var delete_id = {
      'delete': this.editForm.value
    };
    var dataSave: any
    this.httpService.delete('company', 'deleteCompany', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
