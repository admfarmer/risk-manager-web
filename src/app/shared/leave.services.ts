import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LeacesService {

    constructor(
        @Inject('API_URL') private apiUrl: string,
        private httpClient: HttpClient
    ) { }

    async personStatus(idcard: any) {
        const _url = `${this.apiUrl}/v1/leave/person-status`;
        const body = {
            idcard: idcard
        };
        return this.httpClient.post(_url, body).toPromise();
    }

}
