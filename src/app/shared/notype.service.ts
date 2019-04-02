import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class NotypeService {
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

    async getNotype() {
        const _url = `${this.apiUrl}/notypes`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getTypeShow(idType: any) {
        const _url = `${this.apiUrl}/notypes/${idType}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/notypes`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(idNotype: any, data: object) {
        const _url = `${this.apiUrl}/notypes/${idNotype}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(idNotype: any) {
        const _url = `${this.apiUrl}/notypes/${idNotype}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }
}
