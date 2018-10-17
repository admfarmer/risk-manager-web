import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert.service';
import { LeacesService } from '../../shared/leave.services'
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  idcard: any;
  openLoading: boolean;
  leaves: any;

  constructor(
    private leacesService: LeacesService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.idcard = decoded.idcard;
    // this.idcard = '3341200274298';
  }

  ngOnInit() {
    // this.alertService.success();
    this.getLeaces();
  }

  async getLeaces() {
    try {
      this.openLoading = true;
      const rs: any = await this.leacesService.personStatus(this.idcard);
      if (rs.ok) {
        this.leaves = rs.rows;
        console.log(this.leaves);
        this.openLoading = false;
      } else {
        this.openLoading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

}
