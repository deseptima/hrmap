import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  gridStyle = {
    width: '33%',
    textAlign: 'center'
  };
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  role = localStorage.getItem('role')
  constructor(
    private router: Router, ) {
  }
  route(link: any) {
    this.router.navigateByUrl(link)
  }
  ngOnInit(): void {
  }
}
