import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class IncidentService {
  token: any;
  httpOptions: any;
  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }


  async Time() {
    const _url = `${this.apiUrl}/incidents/listTime`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async Location() {
    const _url = `${this.apiUrl}/incidents/listLocation`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async Affected() {
    const _url = `${this.apiUrl}/incidents/listAffected`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getNotApprove() {
    const _url = `${this.apiUrl}/incidents/listNotChief`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getApprove() {
    const _url = `${this.apiUrl}/incidents/listChief`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectIn(dep_rep_one: any, dep_res_group: any) {
    const _url = `${this.apiUrl}/incidents/selectIn/${dep_rep_one}/${dep_res_group}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectInOne(dep_rep_one: any) {
    const _url = `${this.apiUrl}/incidents/selectInOne/${dep_rep_one}}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectOut(dep_rep_one: any, dep_res_group: any) {
    const _url = `${this.apiUrl}/incidents/selectOut/${dep_rep_one}/${dep_res_group}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectOutOne(dep_rep_one: any) {
    const _url = `${this.apiUrl}/incidents/selectOutOne/${dep_rep_one}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectShowIn(dep_res_one: any, dep_res_group: any) {
    const _url = `${this.apiUrl}/incidents/selectShowIn/${dep_res_one}/${dep_res_group}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectShowInOne(dep_res_one: any) {
    const _url = `${this.apiUrl}/incidents/selectShowInOne/${dep_res_one}}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectShowOut(dep_res_one: any, dep_res_group: any) {
    const _url = `${this.apiUrl}/incidents/selectShowOut/${dep_res_one}/${dep_res_group}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectShowOutOne(dep_res_one: any) {
    const _url = `${this.apiUrl}/incidents/selectShowOutOne/${dep_res_one}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getNotClose() {
    const _url = `${this.apiUrl}/incidents/listNotOutput`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }
  async getClose() {
    const _url = `${this.apiUrl}/incidents/listOutput`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/incidents`;
    return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
  }

  async update(id_incident: any, data: object) {
    const _url = `${this.apiUrl}/incidents/${id_incident}`;
    return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
  }

  async remove(id_incident: any) {
    const _url = `${this.apiUrl}/incidents/${id_incident}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }


  async sendBotLine(message: any) {
    const _url = `${this.apiUrl}/incidents/botline`;
    return this.httpClient.post(_url, {
      token: 'TPQG4mGOTMb2xbZJVqBBlzVmEBrkWgHhRF1d2E3Ono8', message: message
      // token: 'B10ZaXJb5EIu07jBSPGYbUvVL7hyASPFQpyOba1Apmo', message: message
      // token: 'MbIXGoEiskyA3niKQwFhLeNMvSvgMZAw4Q4MgnSVwlb', message: message
    }, this.httpOptions).toPromise();
  }

}
