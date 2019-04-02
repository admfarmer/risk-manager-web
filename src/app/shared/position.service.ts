import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class PosiTionService {
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

    async getPosiTion() {
        const _url = `${this.apiUrl}/position`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async addPosiTion(
        id_pos: any,
        pos_name: any
    ) {
        const _url = `${this.apiUrl}/position`;
        return this.httpClient.post(_url, {
            pos_name: pos_name
        }, this.httpOptions).toPromise();
    }

    async updatePosiTion(
        id_pos: any,
        pos_name: any
    ) {
        const _url = `${this.apiUrl}/position`;
        return this.httpClient.put(_url, {
            id_pos: id_pos,
            pos_name: pos_name
        }, this.httpOptions).toPromise();
    }

    async remove(id_pos: any) {
        const _url = `${this.apiUrl}/position/del`;
        return this.httpClient.post(_url, {
            id_pos: id_pos
        }, this.httpOptions).toPromise();
    }

}
