import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vendor } from './vendor';
import { VendorService } from './vendor.service';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
@Component({
  selector: 'app-exercises',
  templateUrl: './vendor-home.component.html',
})
export class VendorHomeComponent implements OnInit {
  vendors: Array<Vendor>;
  vendor: Vendor;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  constructor(public restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'vendors';
  } // constructor
  ngOnInit() {
    this.msg = 'loading vendors from server...';
    this.restService.load(this.url).subscribe(
      payload => {
        this.vendors = payload._embedded.vendors;
        this.msg = 'Vendors Loaded!!';
      },
      err => {
        this.vendors = [];
        this.msg = `Error - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  } // ngOnInit
  select(vendor: Vendor) {
    this.todo = 'update';
    this.vendor = vendor;
    this.msg = `${vendor.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string) {
    if (msg) {
      this.msg = 'Operation cancelled';
    }
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  /**
   * update - send changed update to service update local array
   */
  update(vendor: Vendor) {
    this.restService.update(`${this.url}/${vendor.id}`, vendor).subscribe( payload => {
        if (payload.id > 0) {
// update local array using ? operator with data returned from the server
          this.vendors = this.vendors.map(emp => emp.id === vendor.id ? ( Object as any ).assign({}, emp, payload) : emp);
          this.msg = `Vendor ${vendor.id} updated!`;
        } else {
          this.msg = 'Vendor not updated! - server error';
        }
        this.hideEditForm = !this.hideEditForm;
      },
      err => {
        this.msg = `Error - vendor not updated - ${err.status} - ${err.statusText}`;
      });
  } // update

  /**
   * save - determine whether we're doing and add or an update
   */
  save(vendor: Vendor) {
    (vendor.id) ? this.update(vendor) : this.add(vendor);
  } // save
  /**
   * add - send vendor to service, receive newid back
   */
  add(vendor: Vendor) {
    vendor.id = 0;
    this.restService.add(this.url, vendor)
      .subscribe(payload => {
          if (payload.id > 0) { // server returns new id
            this.vendors = [...this.vendors, payload]; // add vendor to current array using spread
            vendor.id = payload.id;
            this.msg = `Vendor ${payload.id} added!`;
          } else {
            this.msg = 'Vendor not added!';
          }
          this.hideEditForm = !this.hideEditForm;
        },
        err => {
          this.msg = `Error - vendor not added - ${err.status} - ${err.statusText}`;
        });
  } // add
  /**
   * delete - send vendor id to service for deletion and remove from local collection
   */
  delete(vendor: Vendor) {
    this.restService.delete(`${this.url}/search/deleteOne?vendorid=${vendor.id}`)
      .subscribe(payload => {
          if (payload === 1) { // server returns # rows deleted
            this.msg = `Vendor ${vendor.id} deleted!`;
            this.vendors = this.vendors.filter(emp => emp.id !== vendor.id);
          } else {
            this.msg = 'Vendor not deleted!';
          }
          this.hideEditForm = !this.hideEditForm;
        },
        err => {
          this.msg = `Error - vendor not deleted - ${err.status} - ${err.statusText}`;
        });
  } // delete
  /**
   * newVendor - create new vendor instance
   */
  newVendor() {
    this.vendor = {id: null, name: '', address1: '', city: '', province: '', postalcode: '', phone: '', type: '', email: ''};
    this.msg = 'New vendor';
    this.hideEditForm = !this.hideEditForm;
  } // newVendor

} // VendorHomeComponent
