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
  subject: "Appointment to check case"
  type: "Appointment"
  title: Array<any> = [];
  public form: FormGroup;
  constructor(private datepipe: DatePipe,
    private modal: NzModalService,
    private httpService: HttpService,
    private router: Router, ) {
    this.form = new FormGroup({
      data: new FormControl('')
    });

  }
  isVisible = false
  isVisible2 = false
  selectedValue: any
  selectEmployee = '1'
  confirmModal: NzModalRef;
  dataSetMontly = [
    {
      id: '1',
      date: new Date('2018-12-19T00:00:00').toString(),
      data: 'HRMAP',
      startDate: '2018-12-19T00:00:00',
      endDate: '2018-12-22T00:00:00'
    },
    {
      id: '2',
      date: new Date('2018-12-20T00:00:00').toString(),
      data: 'HRMAP',
      startDate: '2018-12-20T00:00:00',
      endDate: '2018-12-22T00:00:00'
    },
    {
      id: '3',
      date: new Date('2018-12-21T00:00:00').toString(),
      data: 'HRMAP',
      startDate: '2018-12-21T00:00:00',
      endDate: '2018-12-22T00:00:00'
    },
    {
      id: '4',
      date: new Date('2018-12-22T00:00:00').toString(),
      data: 'HRMAP',
      startDate: '2018-12-22T00:00:00',
      endDate: '2018-12-22T00:00:00'
    },
  ];
  calendarModalData = {
    subject: '',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    isAllDay: false,
    details: '',
    type: '1',
    point: 0,
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  ngOnInit() {


  }

  showModal(id?: any): void {
    this.isVisible = true;
    // console.log(id)
    if (id) {
      this.calendarModalData.subject = this.dataSetMontly[id - 1].data
      this.calendarModalData.startDate = new Date(this.dataSetMontly[id - 1].startDate)
      this.calendarModalData.endDate = new Date(this.dataSetMontly[id - 1].endDate)
      this.calendarModalData.point = 1
    }
    const dataToLoadPage = {
      'loadPage': 'this.form.value'
    };
    this.httpService.search('dashboard', 'LoadPageHtml', dataToLoadPage).subscribe(
      // data => {
      //   const responds = data.json();
      //   if (responds.success) {
      //     this.title = responds;
      //     // this.form = data.json().data.item;
      //     console.info(this.title);
      //   } else {
      //     console.info('Load Error');
      //   }
      // },
      // err => {
      //   console.info(err);
      // }
    );
    // this.calendarModalData.subject = this.subject
    // this.calendarModalData.startDate = new Date(this.startDate)
    // this.startTime = this.startTime
    // this.calendarModalData.endDate = new Date(this.endDate)
    // this.endTime = this.endTime
    // this.calendarModalData.isAllDay = this.isAllDay
    // this.calendarModalData.details = this.details
    // this.calendarModalData.type = this.type
    // // for (var i = 0; i < this.allCalendarData.length; i++) {
    // //   if (this.tempModalData.id == this.allCalendarData[i].id) {
    // //     this.calendarModalData = this.tempModalData
    // //   }
    // // }

    // this.calendarModalData.startTime = new Date(0, 0, 0, parseInt(this.startTime.toString().split(':')[0]), parseInt(this.startTime.toString().split(':')[1]), parseInt(this.startTime.toString().split(':')[2]))
    // this.calendarModalData.endTime = new Date(0, 0, 0, parseInt(this.endTime.toString().split(':')[0]), parseInt(this.endTime.toString().split(':')[1]), parseInt(this.endTime.toString().split(':')[2]))
    // // console.log(a)
  }
  handleOk(): void {
    this.isVisible = false;
    this.calendarModalData = {
      subject: '',
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      isAllDay: false,
      details: '',
      type: '1',
      point: 0,
    }
  }

  handleCancel(): void {
    // this.calendarModalData = {
    //   subject: '',
    //   startDate: new Date(),
    //   startTime: new Date(),
    //   endDate: new Date(),
    //   endTime: new Date(),
    //   isAllDay: false,
    //   details: '',
    //   type: '1',
    //   point: 0,
    // }
    var sampleData = {
      subject: '',
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      isAllDay: false,
      details: '',
      type: '1',
      point: 0,
    }
    if (this.calendarModalData.subject != sampleData.subject
      || this.calendarModalData.isAllDay != sampleData.isAllDay
      || this.calendarModalData.details != sampleData.details
      || this.calendarModalData.type != sampleData.type
      || this.calendarModalData.point != sampleData.point) {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Do you Want to discard these items?',
        nzContent: 'When clicked the OK button, all items will be discarded',
        nzOnOk: () => {
          this.isVisible = false;
          this.calendarModalData = sampleData
        }
      });

    } else {
      this.isVisible = false;
    }
    // console.log(this.calendarModalData==this.sampleData)
    // console.log(this.calendarModalData)
    // console.log(this.sampleData)
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
    // console.log('onChange: ', result);
    if (result == '1') {
      this.dataSetMontly = [
        {
          id: '1',
          date: new Date('2018-12-19T00:00:00').toString(),
          data: 'HRMAP',
          startDate: '2018-12-19T00:00:00',
          endDate: '2018-12-22T00:00:00'
        },
        {
          id: '2',
          date: new Date('2018-12-20T00:00:00').toString(),
          data: 'HRMAP',
          startDate: '2018-12-20T00:00:00',
          endDate: '2018-12-22T00:00:00'
        },
        {
          id: '3',
          date: new Date('2018-12-21T00:00:00').toString(),
          data: 'HRMAP',
          startDate: '2018-12-21T00:00:00',
          endDate: '2018-12-22T00:00:00'
        },
        {
          id: '4',
          date: new Date('2018-12-22T00:00:00').toString(),
          data: 'HRMAP',
          startDate: '2018-12-22T00:00:00',
          endDate: '2018-12-22T00:00:00'
        },
      ];

    } else if (result == '2') {
      this.dataSetMontly = [
        {
          id: '1',
          date: new Date('2018-12-10T00:00:00').toString(),
          data: 'RawDo',
          startDate: '2018-12-10T00:00:00',
          endDate: '2018-12-12T00:00:00'
        },
        {
          id: '2',
          date: new Date('2018-12-11T00:00:00').toString(),
          data: 'RawDo',
          startDate: '2018-12-11T00:00:00',
          endDate: '2018-12-12T00:00:00'
        },
        {
          id: '3',
          date: new Date('2018-12-12T00:00:00').toString(),
          data: 'RawDo',
          startDate: '2018-12-12T00:00:00',
          endDate: '2018-12-12T00:00:00'
        },
      ];
    }
  }
}
