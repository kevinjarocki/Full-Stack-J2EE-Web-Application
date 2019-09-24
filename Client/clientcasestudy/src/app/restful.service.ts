import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
// we declare that this service should be created
// by the root application injector. new with v6
  providedIn: 'root',
})
export class RestfulService {
  constructor(public http: HttpClient) {
  } // constructor
  /**
   * Retrieves the json, pass back to a subscriber
   */
  load(url) {
    return this.http.get<any>(url);
  } // load
  /**
   * update an entity on the server using http put return number of entities updated
   */
  update(url: string, entity: any) {
    return this.http.put<any>(url, entity);
  } // update
  /**
   * send an entity on the server using http post, return id (could be string)
   */
  add(url: string, entity: any) {
    return this.http.post<any>(url, entity);
  } // add
  /**
   * delete an entity using http delete, return number of entities deleted
   */
  delete(url: string) {
    return this.http.get<any>(url);
  } // delete
} // RestfulService
