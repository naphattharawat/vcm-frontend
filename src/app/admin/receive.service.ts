import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiveService {

  token: any;
  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) {
    this.token = sessionStorage.getItem('token');
  }

  async list(limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/receives/list`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp;
  }

  async getReceiveProducts(receiveId) {
    const resp = await this.http.get(`${this.url}/receives/products?receiveId=${receiveId}`).toPromise();
    return resp;
  }

  async search(query: any, limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/receives/search`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp;
  }

  async delete(receiveId) {
    const resp = await this.http.delete(`${this.url}/receives?receiveId=${receiveId}`).toPromise();
    return resp;
  }

}
