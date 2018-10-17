import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private alertService: AlertService) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  async doLogin() {
    try {
      const rs: any = await this.loginService.doLogin(this.username, this.password);
      if (rs.ok) {
        console.log(rs.token);
        sessionStorage.setItem('token', rs.token);
        this.router.navigate(['/apps']);
      } else {
        this.alertService.error(rs.message);
      }
    } catch (error) {
      this.alertService.error();
    }
    // sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Mzg3MjQwMTQsImV4cCI6MTUzODgxMDQxNH0.ldHvZP5sXMLXjt4Lh3fBOu0obH_VtRg0xp_uxwusLfU');

    // this.router.navigate(['/apps']);
  }

}
