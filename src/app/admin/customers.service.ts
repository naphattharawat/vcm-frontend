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

  async getMachine(customerId: any) {
    const resp = await this.http.get(`${this.url}/customers/machine/${customerId}`).toPromise();
    return resp;
  }

  async removeMachineCustomer(machineId: any) {
    const resp = await this.http.put(`${this.url}/customers/machine`, {
      machineId: machineId
    }).toPromise();
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

  async update(customerId, data) {
    const resp = await this.http.put(`${this.url}/customers?customerId=${customerId}`, {
      data: data
    }).toPromise();
    return resp;
  }

  async save(data) {
    const resp = await this.http.post(`${this.url}/customers`, {
      data: data
    }).toPromise();
    return resp;
  }

  async saveTel(customerId, data) {
    const resp = await this.http.post(`${this.url}/customers/telephone`, {
      customerId: customerId,
      data: data
    }).toPromise();
    return resp;
  }
  async saveFax(customerId, data) {
    const resp = await this.http.post(`${this.url}/customers/fax`, {
      customerId: customerId,
      data: data
    }).toPromise();
    return resp;
  }
  async saveContact(customerId, data) {
    const resp = await this.http.post(`${this.url}/customers/contact`, {
      customerId: customerId,
      data: data
    }).toPromise();
    return resp;
  }

}
