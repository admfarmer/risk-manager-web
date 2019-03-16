import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ViewreportService {
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

    async viewReport(sql: any, params: any) {
        const _url = `${this.apiUrl}/report`;
        return this.httpClient.post(_url, { query_sql: sql, query_params: params }, this.httpOptions).toPromise();
    }

    async selectReport(query_id: any) {
        const _url = `${this.apiUrl}/subitem/${query_id}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }
}
