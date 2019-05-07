import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class LevelService {
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

    async getLevel() {
        const _url = `${this.apiUrl}/levels`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelect(id_side: any) {
        const _url = `${this.apiUrl}/levels/select/${id_side}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/levels`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(levelId: any, data: object) {
        const _url = `${this.apiUrl}/levels/${levelId}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(levelId: any) {
        const _url = `${this.apiUrl}/levels/${levelId}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }

}
