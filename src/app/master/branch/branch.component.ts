import { Component } from '@angular/core';

@Component({
  selector: 'master-branch',
  templateUrl: './branch.component.html'
})
export class BranchComponent {
  data = [
    {
      id: 1,
      name: 'สาขา รังสิต',
      address: '51/597 หมู่ 7 ตำบล หลักหก อำเภอ เมือง จังหวัด ปทุมธานี'
    }
  ];

  sortName = null;
  sortValue = null;
  displayData = [...this.data]

  sort(sort: { key: string, value: string }): void {
    console.log(sort.key + ',' + sort.value)
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    // const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    // const data = this.data.filter(item => filterFunc(item));
    var data = this.data
    /** sort data **/
    if (this.sortName && this.sortValue) {
      console.log('a')
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
  ngOnInit(): void {
  }
}
