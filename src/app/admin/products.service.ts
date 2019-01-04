import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) { }

  async search(query: any, limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/products/search`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp;
  }

  async all(limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/products`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp;
  }
}
