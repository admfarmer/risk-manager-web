import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();

  collapsed: boolean = true;
  fullname: any;
  userType: any;

  constructor(
    private router: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.fullname = decoded.fullname;
    this.userType = decoded.userType;

  }

  ngOnInit() {

  }

  logout() {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('idcard');
    sessionStorage.removeItem('departID');
    sessionStorage.removeItem('departGRP');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('codeGRP');

    this.router.navigate(['/login']);
  }

}
