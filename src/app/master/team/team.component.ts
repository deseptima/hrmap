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
  selector: 'master-team',
  templateUrl: './team.component.html'
})
export class TeamComponent {
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

  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlCompany = []
  ddlBranch = []
  ddlDep = []
  sortName = 'team_code';
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
      teamid: [''],
      teamcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamname: ['', [Validators.required]],
      teamheader: ['', [Validators.required]],
    });
    this.editForm = this.fb.group({
      teamid: [''],
      teamcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamname: ['', [Validators.required]],
      teamheader: ['', [Validators.required]],
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
      'searchTeam': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('team', 'searchTeam', search).subscribe(
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
    this.httpService.search('team', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('team', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('team', 'ddlDep', {}).subscribe(
      res => {
        dataSave = res
        this.ddlDep = dataSave.data
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
    this.httpService.save('team', 'saveTeam', save).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      teamid: [''],
      teamcode: ['', [Validators.required]],
      branchcode: ['', [Validators.required]],
      companycode: ['', [Validators.required]],
      depcode: ['', [Validators.required]],
      teamname: ['', [Validators.required]],
      teamheader: ['', [Validators.required]],
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
            teamid: [''],
            teamcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depcode: ['', [Validators.required]],
            teamname: ['', [Validators.required]],
            teamheader: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.addVisible = false;
      this.saveForm = this.fb.group({
        teamid: [''],
        teamcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depcode: ['', [Validators.required]],
        teamname: ['', [Validators.required]],
        teamheader: ['', [Validators.required]],
      });
    }
  }

  editModal(id?: any) {
    this.editVisible = !this.editVisible
    var data = this.displayData.filter(a => a.team_id == id)
    console.log(data);

    this.editForm.controls.teamid.setValue(data[0].team_id)
    this.editForm.controls.teamcode.setValue(data[0].team_code)
    this.editForm.controls.teamname.setValue(data[0].team_name)
    this.editForm.controls.teamheader.setValue(data[0].team_header)
    this.editForm.controls.branchcode.setValue(data[0].branch_code)
    this.editForm.controls.companycode.setValue(data[0].company_code)
    this.editForm.controls.depcode.setValue(data[0].dep_code)
    var dataSave: any
    this.httpService.search('team', 'ddlCompany', {}).subscribe(
      res => {
        dataSave = res
        this.ddlCompany = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('team', 'ddlBranch', {}).subscribe(
      res => {
        dataSave = res
        this.ddlBranch = dataSave.data
        console.log(dataSave);
      }
    );
    this.httpService.search('team', 'ddlDep', {}).subscribe(
      res => {
        dataSave = res
        this.ddlDep = dataSave.data
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
    this.httpService.save('team', 'saveTeam', save).subscribe(
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
            teamid: [''],
            teamcode: ['', [Validators.required]],
            branchcode: ['', [Validators.required]],
            companycode: ['', [Validators.required]],
            depcode: ['', [Validators.required]],
            teamname: ['', [Validators.required]],
            teamheader: ['', [Validators.required]],
          });
        }
      });
    } else {
      this.editVisible = false;
      this.editForm = this.fb.group({
        teamid: [''],
        teamcode: ['', [Validators.required]],
        branchcode: ['', [Validators.required]],
        companycode: ['', [Validators.required]],
        depcode: ['', [Validators.required]],
        teamname: ['', [Validators.required]],
        teamheader: ['', [Validators.required]],
      });
    }
  }

  delete(id: any) {
    console.log(id);
    var data = this.displayData.filter(a => a.team_id == id)
    this.editForm.controls.teamid.setValue(data[0].team_id + '')
    console.log(data);

    var delete_id = {
      'delete': this.editForm.value
    };
    var dataSave: any
    this.httpService.delete('team', 'deleteTeam', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
  }

}
