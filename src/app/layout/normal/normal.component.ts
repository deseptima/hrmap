import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'layout-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.less']
})
export class NormalComponent {
  isCollapsed = false;

  constructor(
    private router: Router,) {
  }

  close() {
    this.isCollapsed = false
  }

  route(link:any){
    this.router.navigateByUrl(link)
    this.isCollapsed = false

  }

  logout() {
    this.router.navigateByUrl('/login')
    console.log('out')
  }

}
