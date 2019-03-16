import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class TypeService {
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

    async getType() {
        const _url = `${this.apiUrl}/types`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSafetyShow(idSafety: any) {
        const _url = `${this.apiUrl}/types/${idSafety}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/types`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(idTypes: any, data: object) {
        const _url = `${this.apiUrl}/types/${idTypes}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(idTypes: any) {
        const _url = `${this.apiUrl}/types/${idTypes}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }

}
