import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RestfulService {
  constructor(public http: HttpClient) {
  } // constructor
  /**
   * Retrieves the json, pass back to a subscriber
   */
  load(url) {
    const headers = this.buildHeader();
    return this.http.get<any>(url, { headers });
  } // load
  /**
   * update an entity on the server using http put return number of entities updated
   */
  update(url: string, entity: any) {
    const headers = this.buildHeader();
    return this.http.put<any>(url, entity, { headers });
  } // update
  /**
   * send an entity on the server using http post, return id (could be string)
   */
  add(url: string, entity: any) {
    const headers = this.buildHeader();
    return this.http.post<any>(url, entity, { headers });
  } // add
  /**
   * delete an entity using http delete, return number of entities deleted
   */
  delete(url: string) {
    const headers = this.buildHeader();
    return this.http.get<any>(url, { headers });
  } // delete
  private buildHeader(): HttpHeaders {
    if (sessionStorage.getItem('token')) {
      return new HttpHeaders(
        { 'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Basic ' + btoa(sessionStorage.getItem('token'))}
      ); // return
    } // if
  } // buildHeader
} // RestfulService
