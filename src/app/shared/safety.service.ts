import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class SafetyService {
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

    async getSafety() {
        const _url = `${this.apiUrl}/safetys`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSideShow(idSide: any) {
        const _url = `${this.apiUrl}/safetys/${idSide}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/safetys`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(idSafetys: any, data: object) {
        const _url = `${this.apiUrl}/safetys/${idSafetys}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(idSafetys: any) {
        const _url = `${this.apiUrl}/safetys/${idSafetys}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }

}