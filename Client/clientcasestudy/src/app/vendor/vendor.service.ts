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
   * Retrieves the employees collection, parses the JSON, then returns the array to a subscriber
   */
  load() {
    return this.http.get<any>(this.resourceURL);
  } // load
}
