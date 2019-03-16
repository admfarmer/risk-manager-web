import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class DepartService {
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
    async selectDepartGPE(code_group: any) {
        const _url = `${this.apiUrl}/departs/selectDepartGPE/${code_group}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getDepart() {
        const _url = `${this.apiUrl}/departs`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getDepartID(id_depart: any) {
        const _url = `${this.apiUrl}/departs/selectID/${id_depart}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async DepQuality() {
        const _url = `${this.apiUrl}/departs/quality`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async selectDepart(code_depart: any, varquality: any) {
        const _url = `${this.apiUrl}/departs/${code_depart}/${varquality}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }


    async addDepart(
        id_depart: any,
        code_depart: any,
        code_group: any,
        name_depart: any,
        status: any
    ) {
        const _url = `${this.apiUrl}/departs`;
        return this.httpClient.post(_url, {
            code_depart: code_depart,
            code_group: code_group,
            name_depart: name_depart,
            status: status
        }, this.httpOptions).toPromise();
    }

    async updateDepart(
        id_depart: any,
        code_depart: any,
        code_group: any,
        name_depart: any,
        status: any
    ) {
        const _url = `${this.apiUrl}/departs`;
        return this.httpClient.put(_url, {
            id_depart: id_depart,
            code_depart: code_depart,
            code_group: code_group,
            name_depart: name_depart,
            status: status
        }, this.httpOptions).toPromise();
    }

    async remove(id_depart: any) {
        const _url = `${this.apiUrl}/departs/del`;
        return this.httpClient.post(_url, {
            id_depart: id_depart
        }, this.httpOptions).toPromise();
    }
}
