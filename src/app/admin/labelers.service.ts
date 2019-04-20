import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class LabelersService {

  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) { }

  async list() {
    const resp = await this.http.get(`${this.url}/labelers`).toPromise();
    return resp;
  }

  async info(labelerId: any) {
    const resp = await this.http.get(`${this.url}/labelers/info/${labelerId}`).toPromise();
    return resp;
  }

  async getTelephone(labelerId: any) {
    const resp = await this.http.get(`${this.url}/labelers/telephone/${labelerId}`).toPromise();
    return resp;
  }

  async getFax(labelerId: any) {
    const resp = await this.http.get(`${this.url}/labelers/fax/${labelerId}`).toPromise();
    return resp;
  }

  async getContact(labelerId: any) {
    const resp = await this.http.get(`${this.url}/labelers/contact/${labelerId}`).toPromise();
    return resp;
  }

  async getProduct(labelerId: any) {
    const resp = await this.http.get(`${this.url}/labelers/product/${labelerId}`).toPromise();
    return resp;
  }

  async removeMachineCustomer(machineId: any) {
    const resp = await this.http.put(`${this.url}/labelers/machine`, {
      machineId: machineId
    }).toPromise();
    return resp;
  }


  async search(query: any) {
    const resp = await this.http.get(`${this.url}/labelers/search?query=${query}`).toPromise();
    return resp;
  }

  async delete(labelerId) {
    const resp = await this.http.delete(`${this.url}/labelers?labelerId=${labelerId}`).toPromise();
    return resp;
  }

  async update(labelerId, data) {
    const resp = await this.http.put(`${this.url}/labelers?labelerId=${labelerId}`, {
      data: data
    }).toPromise();
    return resp;
  }

  async save(data) {
    const resp = await this.http.post(`${this.url}/labelers`, {
      data: data
    }).toPromise();
    return resp;
  }

  async saveTel(labelerId, data) {
    const resp = await this.http.post(`${this.url}/labelers/telephone`, {
      labelerId: labelerId,
      data: data
    }).toPromise();
    return resp;
  }
  async saveFax(labelerId, data) {
    const resp = await this.http.post(`${this.url}/labelers/fax`, {
      labelerId: labelerId,
      data: data
    }).toPromise();
    return resp;
  }
  async saveContact(labelerId, data) {
    const resp = await this.http.post(`${this.url}/labelers/contact`, {
      labelerId: labelerId,
      data: data
    }).toPromise();
    return resp;
  }

}
