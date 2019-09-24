import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Vendor } from './vendor';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  resourceURL: string;
  status: string;
  constructor(public http: HttpClient) {
    this.resourceURL = BASEURL + 'vendors';
  } // constructor
  /**
   * Retrieves the vendors collection, parses the JSON, then returns the array to a subscriber
   */
  load() {
    return this.http.get<any>(this.resourceURL);
  } // load

  /**
   * Update an vendor on the server using http put, server returns updated vendor
   */
  update(vendor: Vendor) {
    return this.http.put<Vendor>(`${this.resourceURL}/${vendor.id}`, vendor);
  } // update

  /**
   * add an vendor on the server using http post
   */
  add(vendor: Vendor) {
    vendor.id = 0;
    return this.http.post<any>(this.resourceURL, vendor);
  } // add
  /**
   * delete an vendor on the server, using get for custom url not delete
   */
  delete(id) {
    return this.http.get<number>(`${this.resourceURL}/search/deleteOne?vendorid=${id}`);
  } // delete

}
