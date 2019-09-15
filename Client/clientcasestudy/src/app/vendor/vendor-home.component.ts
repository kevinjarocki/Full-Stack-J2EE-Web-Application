import { Component, OnInit } from '@angular/core';
import { Vendor } from './vendor';
import { VendorService } from './vendor.service';
@Component({
  selector: 'app-exercises',
  templateUrl: './vendor-home.component.html'
})
export class VendorHomeComponent implements OnInit {
  vendors: Array<Vendor>;
  msg: string;
  constructor(public vendorService: VendorService) {} // constructor
  ngOnInit() {
    this.msg = 'loading vendors from server...';
    this.vendorService.load().subscribe(
      payload => {
        this.vendors = payload._embedded.vendors;
        this.msg = 'vendors loaded!!';
      },
      err => {
        this.vendors = [];
        this.msg = `Error - vendors not loaded - ${err.status} - ${err.statusText}`;
      }); // subscribe
  } // ngOnInit
} // VendorHomeComponent
