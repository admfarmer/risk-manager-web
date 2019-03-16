import { Component, Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class AccountService {
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

    async getAccount() {
        const _url = `${this.apiUrl}/accounts`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelectacc(code_account: any) {
        const _url = `${this.apiUrl}/accounts/selectacc/${code_account}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelect(id_side: any, id_safety: any, id_type, id_notype: any) {
        const _url = `${this.apiUrl}/accounts/${id_side}/${id_safety}/${id_type}/${id_notype}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async save(data: object) {
        const _url = `${this.apiUrl}/accounts`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(accountId: any, data: object) {
        const _url = `${this.apiUrl}/accounts/${accountId}`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(accountId: any) {
        const _url = `${this.apiUrl}/accounts/${accountId}`;
        return this.httpClient.delete(_url, this.httpOptions).toPromise();
    }
}

