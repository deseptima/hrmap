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
  selector: 'master-branch',
  templateUrl: './branch.component.html'
})
export class BranchComponent {
  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlCompany = []
  data = [
    {
      id: 1,
      branchCode: '001',
      companyCode: '001: Soft Square International Co., Ltd.',
      name: 'สาขา รังสิต',
      address: '51/597 หมู่ 7 ตำบล หลักหก อำเภอ เมือง จังหวัด ปทุมธานี'
    }
  ];

  sortName = 'branch_code';
  sortValue = 'ascend';
  displayData = []

  constructor(private fb: FormBuilder, private modal: NzModalService,
    private httpService: HttpService, ) { }

  ngOnInit(): void {
    this.saveForm = this.fb.group({
      branchid: [''],
      branchname: ['', [Validators.required]],
      branchaddress: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      branchid: [''],
      branchname: ['', [Validators.required]],
      branchaddress: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.search()
  }

  submitForm(): void {
    // console.log(this.saveForm.controls);
    // console.log(this.saveForm.controls.branchcode);
    var i: any
    for (i in this.saveForm.controls) {
      if (i != 'branchcode') {
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
      'searchBranch': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('branch', 'searchBranch', search).subscribe(
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
    this.httpService.search('branch', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
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
    this.httpService.save('branch', 'saveBranch', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      branchid: [''],
      branchname: ['', [Validators.required]],
      branchaddress: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
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
    var data = this.displayData.filter(a => a.branch_id == id)
    this.editForm.controls.branchid.setValue(data[0].branch_id)
    this.editForm.controls.branchcode.setValue(data[0].branch_code)
    this.editForm.controls.branchname.setValue(data[0].branch_name)
    this.editForm.controls.branchaddress.setValue(data[0].branch_address)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    var dataSave: any
    this.httpService.search('branch', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
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
    this.httpService.save('branch', 'saveBranch', save).subscribe(
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
    var data = this.displayData.filter(a => a.branch_id == id)
    this.editForm.controls.branchid.setValue(data[0].branch_id + '')
    console.log(data);

    var delete_id = {
      'delete': this.editForm.value
    };
    var dataSave: any
    this.httpService.delete('branch', 'deleteBranch', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
