import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class SideService {
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

    async getSide() {
        const _url = `${this.apiUrl}/sides`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/sides`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(idSide: any, data: object) {
        const _url = `${this.apiUrl}/sides/${idSide}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(idSide: any) {
        const _url = `${this.apiUrl}/sides/${idSide}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }

}
