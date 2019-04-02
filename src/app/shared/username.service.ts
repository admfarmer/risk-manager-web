import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class UsernameService {
    token: any;
    httpOptions: any;
    userType: any;

    constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
        this.token = sessionStorage.getItem('token');
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

    }

    async selectID(idcard: any) {
        this.userType = sessionStorage.getItem('userType');
        if (this.userType === 'ADMIN') {
            const _url = `${this.apiUrl}/users`;
            return this.httpClient.get(_url, this.httpOptions).toPromise();
        } else {
            const _url = `${this.apiUrl}/users/selectID`;
            return this.httpClient.post(_url, { idcard: idcard }, this.httpOptions).toPromise();
        }
    }

    async getUsername() {
        const _url = `${this.apiUrl}/users`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async postUsername(idcard: any) {
        const _url = `${this.apiUrl}/users/password`;
        return this.httpClient.post(_url, { idcard: idcard }, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/users`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(userId: any, data: object) {
        const _url = `${this.apiUrl}/users/${userId}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async updatePass(userId: any, data: object) {
        const _url = `${this.apiUrl}/users/newpass/${userId}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(id_user: any) {
        const _url = `${this.apiUrl}/users/del`;
        return this.httpClient.post(_url, {
            id_user: id_user
        }, this.httpOptions).toPromise();
    }
}
