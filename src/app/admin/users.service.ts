import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) { }

  async list() {
    const resp = await this.http.get(`${this.url}/users`).toPromise();
    return resp;
  }

  async save(data) {
    const resp = await this.http.post(`${this.url}/users`, {
      data: data
    }).toPromise();
    return resp;
  }

  async update(userId, data) {
    const resp = await this.http.put(`${this.url}/users`, {
      userId: userId,
      data: data
    }).toPromise();
    return resp;
  }

  async remove(userId) {
    const resp = await this.http.delete(`${this.url}/users?userId=${userId}`).toPromise();
    return resp;
  }

}
