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

  async addIncident(
    id_incident: any,
    hn_incident: any,
    idcard_incident: any,
    dep_rep_id: any,
    dep_res_id: any,
    id_side: any,
    id_safety: any,
    id_type: any,
    id_notype: any,
    code_account: any,
    affected_id: any,
    sex_incident: any,
    age_incident: any,
    location_incident: any,
    date_incident: any,
    date_account: any,
    time_incident: any,
    agents_involved: any,
    code_level: any,
    other_involved: any,
    noteceo: any,
    date_rep: any,
    date_res: any,
    resulting_actions: any,
    conf_output: any,
    conf_chief: any,
    conf_nrls: any,
    near_miss_status: any

  ) {
    const _url = `${this.apiUrl}/incidents`;
    return this.httpClient.post(_url, {
      hn_incident: hn_incident,
      idcard_incident: idcard_incident,
      dep_rep_id: dep_rep_id,
      dep_res_id: dep_res_id,
      id_side: id_side,
      id_safety: id_safety,
      id_type: id_type,
      id_notype: id_notype,
      code_account: code_account,
      affected_id: affected_id,
      sex_incident: sex_incident,
      age_incident: age_incident,
      location_incident: location_incident,
      date_incident: date_incident,
      date_account: date_account,
      time_incident: time_incident,
      agents_involved: agents_involved,
      code_level: code_level,
      other_involved: other_involved,
      noteceo: noteceo,
      date_rep: date_rep,
      date_res: date_res,
      resulting_actions: resulting_actions,
      conf_output: conf_output,
      conf_chief: conf_chief,
      conf_nrls: conf_nrls,
      near_miss_status: near_miss_status
    }, this.httpOptions).toPromise();
  }

  async updateIncident(
    id_incident: any,
    hn_incident: any,
    idcard_incident: any,
    dep_rep_id: any,
    dep_res_id: any,
    id_side: any,
    id_safety: any,
    id_type: any,
    id_notype: any,
    code_account: any,
    affected_id: any,
    sex_incident: any,
    age_incident: any,
    location_incident: any,
    date_incident: any,
    date_account: any,
    time_incident: any,
    agents_involved: any,
    code_level: any,
    other_involved: any,
    noteceo: any,
    date_rep: any,
    date_res: any,
    resulting_actions: any,
    conf_output: any,
    conf_chief: any,
    conf_nrls: any,
    near_miss_status: any

  ) {
    const _url = `${this.apiUrl}/incidents`;
    return this.httpClient.put(_url, {
      id_incident: id_incident,
      hn_incident: hn_incident,
      idcard_incident: idcard_incident,
      dep_rep_id: dep_rep_id,
      dep_res_id: dep_res_id,
      id_side: id_side,
      id_safety: id_safety,
      id_type: id_type,
      id_notype: id_notype,
      code_account: code_account,
      affected_id: affected_id,
      sex_incident: sex_incident,
      age_incident: age_incident,
      location_incident: location_incident,
      date_incident: date_incident,
      date_account: date_account,
      time_incident: time_incident,
      agents_involved: agents_involved,
      code_level: code_level,
      other_involved: other_involved,
      noteceo: noteceo,
      date_rep: date_rep,
      date_res: date_res,
      resulting_actions: resulting_actions,
      conf_output: conf_output,
      conf_chief: conf_chief,
      conf_nrls: conf_nrls,
      near_miss_status: near_miss_status
    }, this.httpOptions).toPromise();
  }

  async remove(id_incident: any) {
    const _url = `${this.apiUrl}/incidents/del`;
    return this.httpClient.post(_url, {
      id_incident: id_incident
    }, this.httpOptions).toPromise();
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
