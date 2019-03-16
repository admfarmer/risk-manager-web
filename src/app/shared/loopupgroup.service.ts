import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class LoopupGroupService {
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

    async getLocation() {
        const _url = `${this.apiUrl}/location`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSex() {
        const _url = `${this.apiUrl}/sex`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getTime() {
        const _url = `${this.apiUrl}/time`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getAffected() {
        const _url = `${this.apiUrl}/affected`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }
}
