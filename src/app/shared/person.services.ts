import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class PersonService {

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

    async personStatus(idcard: any) {
        this.userType = sessionStorage.getItem('userType');
        // console.log(this.userType);
        if (this.userType === 'ADMIN') {
            const _url = `${this.apiUrl}/persons/select`;
            return this.httpClient.get(_url, this.httpOptions).toPromise();
        } else if (this.userType === 'CHIEFUSER') {
            const _url = `${this.apiUrl}/persons/selectChief`;
            return this.httpClient.post(_url, { idcard: idcard }, this.httpOptions).toPromise();
        } else {
            const _url = `${this.apiUrl}/persons/selectcard`;
            return this.httpClient.post(_url, { idcard: idcard }, this.httpOptions).toPromise();
        }

    }

    async seve(data: object) {
        const _url = `${this.apiUrl}/persons`;
        return this.httpClient.post(_url, { data }, this.httpOptions).toPromise();
    }

    async update(personId: any, data: object) {
        const _url = `${this.apiUrl}/persons`;
        return this.httpClient.put(_url, { data }, this.httpOptions).toPromise();
    }

    async remove(id_person: any) {
        const _url = `${this.apiUrl}/persons/del`;
        return this.httpClient.post(_url, {
            id_person: id_person
        }, this.httpOptions).toPromise();
    }

    async getPerson() {
        const _url = `${this.apiUrl}/persons`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelect() {
        const _url = `${this.apiUrl}/persons/select`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelectjoin() {
        const _url = `${this.apiUrl}/persons/selectjoin`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async getSelectcard(idcard: any) {
        const _url = `${this.apiUrl}/persons/selectcard`;
        return this.httpClient.post(_url, {
            idcard: idcard
        }, this.httpOptions).toPromise();
    }


    async selectDepart(code_depart: any, varquality: any) {
        const _url = `${this.apiUrl}/depart/${code_depart}/${varquality}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async selectDepartOne(code_depart: any) {
        const _url = `${this.apiUrl}/depart/selectOne/${code_depart}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async DepartID(id_depart: any) {
        const _url = `${this.apiUrl}/depart/selectID/${id_depart}`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async Depart() {
        const _url = `${this.apiUrl}/depart`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async Position() {
        const _url = `${this.apiUrl}/position`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }

    async Gender() {
        const _url = `${this.apiUrl}/gender`;
        return this.httpClient.get(_url, this.httpOptions).toPromise();
    }



}
