import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'layout-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.less']
})
export class NormalComponent {
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

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
