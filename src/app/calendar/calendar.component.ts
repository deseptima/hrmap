import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent {
  constructor(private datepipe: DatePipe, ) {

  }
  isVisible = false
  isVisible2 = false
  selectedValue: any
  dataSetMontly = [{ id: '2', date: new Date('2018-12-20T00:00:00').toString(), data: 'HRMAP', startDate: '2018-12-20T00:00:00', endDate: '2018-12-22T00:00:00' }];
  calendarModalData = {
    subject: 'Subject',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    isAllDay: false,
    details: '',
    type: 'Type'
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
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
  showModal(id?: any): void {
    this.isVisible = true;
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
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.calendarModalData = {
      subject: 'Subject',
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      isAllDay: false,
      details: '',
      type: 'Type'
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.calendarModalData = {
      subject: 'Subject',
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      isAllDay: false,
      details: '',
      type: 'Type'
    }
  }
}
