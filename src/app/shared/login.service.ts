import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

  async doLogin(username: string, password: string) {
    const _url = `${this.apiUrl}/login`;
    const body = {
      username: username,
      password: password
    };
    return this.httpClient.post(_url, body).toPromise();
  }

  async getInfo() {
    const _url = `${this.apiUrl}/info`;
    return this.httpClient.get(_url).toPromise();
  }

}
