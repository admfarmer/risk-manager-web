import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { AlertService } from '../shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PersonService } from 'src/app/shared/person.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .auth form .form-group .form-control {
      font-size: 2rem;
    }
    `
  ]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  hosname: string;
  hoscode: string;
  departID: any;
  departGRP: any;

  jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private personService: PersonService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  async doLogin() {
    try {
      const rs: any = await this.loginService.doLogin(this.username, this.password);

      if (rs.token) {
        const token = rs.token;

        sessionStorage.setItem('token', rs.token);
        const decoded: any = this.jwtHelper.decodeToken(token);
        // console.log(decoded);
        sessionStorage.setItem('fullname', decoded.fullname);
        sessionStorage.setItem('idcard', decoded.idcard);
        sessionStorage.setItem('userType', decoded.userType);
        sessionStorage.setItem('userId', decoded.userId);
        sessionStorage.setItem('username', this.username);
        this.getPersons(decoded.idcard);

        this.router.navigate(['/apps']);
      } else {
        this.alertService.error(rs.message);
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.loginService.getInfo();
      if (rs.info) {
        // sessionStorage.setItem('topic', rs.info.topic);
        sessionStorage.setItem('hoscode', rs.info.hoscode);
        sessionStorage.setItem('hosname', rs.info.hosname);

        this.hoscode = rs.info.hoscode;
        this.hosname = rs.info.hosname;
      } else {
        const message = rs.message || 'เกิดข้อผิดพลาด';
        this.alertService.error(message);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  async getPersons(idcard: any) {
    try {
      const rs: any = await this.personService.getSelectcard(idcard);
      if (rs.results) {
        sessionStorage.setItem('departID', rs.results[0].id_depart);
        if (rs.results[0].code_group === '') {
          sessionStorage.setItem('departGRP', rs.results[0].id_depart);
          sessionStorage.setItem('codeGRP', rs.results[0].code_depart);

        } else {
          sessionStorage.setItem('departGRP', '');
          sessionStorage.setItem('codeGRP', '');
        }
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

}
