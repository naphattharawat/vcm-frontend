import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) { }

  async list() {
    const resp = await this.http.get(`${this.url}/customers`).toPromise();
    return resp;
  }

  async info(customerId: any) {
    const resp = await this.http.get(`${this.url}/customers/info/${customerId}`).toPromise();
    return resp;
  }

  async getTelephone(customerId: any) {
    const resp = await this.http.get(`${this.url}/customers/telephone/${customerId}`).toPromise();
    return resp;
  }

  async getFax(customerId: any) {
    const resp = await this.http.get(`${this.url}/customers/fax/${customerId}`).toPromise();
    return resp;
  }

  async getContact(customerId: any) {
    const resp = await this.http.get(`${this.url}/customers/contact/${customerId}`).toPromise();
    return resp;
  }


  async search(query: any) {
    const resp = await this.http.get(`${this.url}/customers/search?query=${query}`).toPromise();
    return resp;
  }

  async delete(customerId) {
    const resp = await this.http.delete(`${this.url}/customers?customerId=${customerId}`).toPromise();
    return resp;
  }

}
