import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../service/http-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent {
  clientId: 1
  details: "Test Description"
  endDate: "2018-11-22T00:00:00"
  endTime: "16:00:00"
  id: 2
  isAllDay: true
  location: "Siam Paragon"
  priority: "High"
  requirementId: 10131
  servicePersonId: 1
  startDate: "2018-11-20T00:00:00"
  startTime: "13:00:00"
  subject: "Appointsment to check case"
  type: "Appointsment"
  title: Array<any> = [];
  public form: FormGroup;
  isVisible = false
  isVisible2 = false
  selectedValue: any
  selectEmployee = '1'
  dataSetMontly: any
  calendarModalData = {
    subject: '',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    isAllDay: false,
    details: '',
    type: '1',
    points: 0,
  }
  func: any
  modal_id: any
  dataOnChange = true
  //
  saveForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup
  confirmModal: NzModalRef;
  addVisible = false
  editVisible = false
  ddlEmp = []
  modal_name: any

  sortName = 'branch_code';
  sortValue = 'ascend';
  displayData = []
  constructor(private datepipe: DatePipe,
    private modal: NzModalService,
    private httpService: HttpService,
    private router: Router, private fb: FormBuilder, ) {
    this.form = new FormGroup({
      data: new FormControl('')
    });

  }

  ngOnInit() {
    this.saveForm = this.fb.group({
      planid: [''],
      empcode: [''],
      plancode: ['', [Validators.required]],
      planname: ['', [Validators.required]],
      plantype: ['', [Validators.required]],
      points: [''],
      startdate: ['', [Validators.required]],
      plandesc: [''],
    });
    this.editForm = this.fb.group({
      planid: [''],
      empcode: [''],
      plancode: ['', [Validators.required]],
      planname: ['', [Validators.required]],
      plantype: ['', [Validators.required]],
      points: [''],
      startdate: ['', [Validators.required]],
      plandesc: [''],
    });
    this.searchForm = this.fb.group({
      search: ['']
    });
    const search = {
      'search': this.searchForm.value
    };
    var dataSave: any
    this.httpService.search('plan', 'ddlEmp', {}).subscribe(
      res => {
        dataSave = res
        this.ddlEmp = dataSave.data
        console.log(dataSave);
      }
    );
    this.search()
  }

  search() {
    const search = {
      'searchPlan': this.searchForm.value
    };
    var dataSearch: any
    this.httpService.search('plan', 'searchPlan', search).subscribe(
      res => {
        dataSearch = res
        console.log(dataSearch.data.records);
        this.dataSetMontly = []
        if (dataSearch.data.records) {
          for (var i = 0; i < dataSearch.data.records.length; i++) {
            this.dataSetMontly[i] = dataSearch.data.records[i]
            this.dataSetMontly[i].start_date = new Date(this.dataSetMontly[i].start_date).toString()
          }
          // this.searchAction();
          console.log(this.dataSetMontly);

        }
      }
    );
  }

  submitForm(): void {
    // console.log(this.saveForm.controls);
    // console.log(this.saveForm.controls.branchcode);
    var i: any
    for (i in this.saveForm.controls) {
      this.saveForm.controls[i].markAsDirty();
      this.saveForm.controls[i].updateValueAndValidity();
    }
    for (const i in this.searchForm.controls) {
      this.searchForm.controls[i].markAsDirty();
      this.searchForm.controls[i].updateValueAndValidity();
    }
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  showModal(id?: any): void {
    this.func = ''
    this.modal_id = id
    // console.log(id)
    if (id) {
      this.func = 'edit'
      var data = this.dataSetMontly.filter(a => a.plan_id == id)
      console.log(data);
      this.modal_name = data[0].plan_code + ' ' + data[0].plan_name
      this.saveForm.controls.planid.setValue(data[0].plan_id)
      this.saveForm.controls.planname.setValue(data[0].plan_name)
      this.saveForm.controls.plancode.setValue(data[0].plan_code)
      this.saveForm.controls.plantype.setValue(data[0].plan_type)
      this.saveForm.controls.points.setValue(data[0].point)
      this.saveForm.controls.startdate.setValue(data[0].start_date)
      this.saveForm.controls.plandesc.setValue(data[0].plan_desc)
      this.saveForm.controls.empcode.setValue(this.searchForm.controls.search.value)
      console.log(this.saveForm.value);
      this.isVisible = true;
    } else {
      this.func = 'save'
      this.modal_name = ''
      this.saveForm = this.fb.group({
        planid: [''],
        empcode: [''],
        plancode: ['', [Validators.required]],
        planname: ['', [Validators.required]],
        plantype: ['', [Validators.required]],
        points: [''],
        startdate: ['', [Validators.required]],
        plandesc: [''],
      });
      this.saveForm.controls.empcode.setValue(this.searchForm.controls.search.value)
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isVisible = false;
    this.saveForm.controls.points.setValue(this.saveForm.controls.points.value + '')
    if (this.func == 'save') {
      const save = {
        'save': this.saveForm.value
      };
      console.log(save);

      var dataSave: any
      this.httpService.save('plan', 'savePlan', save).subscribe(
        res => {
          dataSave = res
          console.log(dataSave);
          this.search()
        }
      );
      this.saveForm = this.fb.group({
        planid: [''],
        empcode: [''],
        plancode: ['', [Validators.required]],
        planname: ['', [Validators.required]],
        plantype: ['', [Validators.required]],
        points: [''],
        startdate: ['', [Validators.required]],
        plandesc: [''],
      });
    } else if (this.func == 'edit') {
      this.saveForm.controls.startdate.setValue(this.saveForm.controls.startdate.value)
      const edit = {
        'save': this.saveForm.value
      };
      console.log(edit);

      var dataSave: any
      this.httpService.save('plan', 'savePlan', edit).subscribe(
        res => {
          dataSave = res
          console.log(dataSave);
          this.search()
        }
      );
      this.saveForm = this.fb.group({
        planid: [''],
        empcode: [''],
        plancode: ['', [Validators.required]],
        planname: ['', [Validators.required]],
        plantype: ['', [Validators.required]],
        points: [''],
        startdate: ['', [Validators.required]],
        plandesc: [''],
      });
    }
  }

  handleCancel(): void {
    if (this.saveForm.dirty && this.saveForm.value) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'ต้องการที่จะละทิ้งสิ่งที่กรอกไปหรือไม่?',
        nzContent: 'กดตกลงเพื่อละทิ้ง, กดยกเลิกเพื่อกลับเข้าสู่หน้าเดิม',
        nzOkText: 'ตกลง',
        nzCancelText: 'ยกเลิก',
        nzOnOk: () => {
          this.isVisible = false;
          this.saveForm = this.fb.group({
            planid: [''],
            empcode: [''],
            plancode: ['', [Validators.required]],
            planname: ['', [Validators.required]],
            plantype: ['', [Validators.required]],
            points: [''],
            startdate: ['', [Validators.required]],
            plandesc: [''],
          });
        }
      });
    } else {
      this.isVisible = false;
      this.saveForm = this.fb.group({
        planid: [''],
        empcode: [''],
        plancode: ['', [Validators.required]],
        planname: ['', [Validators.required]],
        plantype: ['', [Validators.required]],
        points: [''],
        startdate: ['', [Validators.required]],
        plandesc: [''],
      });
    }
  }

  dateTH(date: any) {
    var dateThai
    date = new Date(date)
    var month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "ธค"][date.getMonth()];
    dateThai = date.getDate() + ' ' + month + date.getFullYear()
    return dateThai
  }

  onChange(result: any): void {
    console.log('onChange: ', result);
    this.dataOnChange = false
    this.search()
  }

  delete(id: any) {
    this.isVisible = false;
    console.log(id);
    var data = this.dataSetMontly.filter(a => a.plan_id == id)
    this.saveForm.controls.planid.setValue(data[0].plan_id + '')
    console.log(this.saveForm.value);

    var delete_id = {
      'delete': this.saveForm.value
    };
    var dataSave: any
    this.httpService.delete('plan', 'deletePlan2', delete_id).subscribe(
      res => {
        dataSave = res
        console.log(dataSave);
        this.search()
      }
    );
    this.saveForm = this.fb.group({
      planid: [''],
      empcode: [''],
      plancode: ['', [Validators.required]],
      planname: ['', [Validators.required]],
      plantype: ['', [Validators.required]],
      points: [''],
      startdate: ['', [Validators.required]],
      plandesc: [''],
    });
  }
}
