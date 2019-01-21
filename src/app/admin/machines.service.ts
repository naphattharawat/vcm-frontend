import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  token: any;
  constructor(
    @Inject('API_URL') private url: string,
    private http: HttpClient
  ) {
    this.token = sessionStorage.getItem('token');
  }
  async search(query: any, limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/machines/search`, {
      limit: limit,
      offset: offset,
      query: query
    }).toPromise();
    return resp;
  }

  async all(limit: number = 10, offset: number = 0) {
    const resp = await this.http.post(`${this.url}/machines`, {
      limit: limit,
      offset: offset
    }).toPromise();
    return resp;
  }

  async info(machineId) {
    const resp = await this.http.get(`${this.url}/machines/info?machineId=${machineId}`).toPromise();
    return resp;
  }

  uploadFile(machineId: string, files: Array<File>, fileName: string = null) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i], fileName);
      }
      formData.append('machineId', machineId);
      formData.append('fileName', fileName);
      formData.append('token', this.token);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = `${this.url}/machines/image?token=${this.token}`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  async save(data) {
    const resp = await this.http.post(`${this.url}/machines/save`, {
      data: data
    }).toPromise();
    return resp;
  }

  async update(machineId, data) {
    const resp = await this.http.put(`${this.url}/machines/save`, {
      data: data,
      machineId: machineId
    }).toPromise();
    return resp;
  }

  async delete(machineId) {
    const resp = await this.http.delete(`${this.url}/machines?machineId=${machineId}`).toPromise();
    return resp;
  }

}
