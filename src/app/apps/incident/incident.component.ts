import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IncidentService } from 'src/app/shared/incident.service'

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styles: []
})
export class IncidentComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();

  openLoading: boolean;
  searchText: string;
  departID: any;
  departGRP: any;
  codeGRP: any;
  idcard: any;
  personId: any;

  incidentItems: any = [];
  departGRPItem: any = [];
  approveNotItems: any = [];
  approveItems: any = [];
  closeNotItems: any = [];
  closeItems: any = [];
  personItems: any = [];
  userType: any;

  p: number = 1;
  constructor(
    private incidentService: IncidentService,
    private alertService: AlertService,
  ) {
    this.idcard = sessionStorage.getItem('idcard');

    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);

    this.departID = sessionStorage.getItem('departID');
    this.departGRP = sessionStorage.getItem('departGRP');
    this.codeGRP = sessionStorage.getItem('codeGRP');

    this.userType = decoded.userType;

    // console.log(decoded);
  }

  ngOnInit() {
    this.getIncidentAll();
  }

  openRegister() {
    this.personId = null;
    // this.mdlPersons.open();
  }

  openEdit(item: any) {
    // console.log(item);
    // this.mdlPersons.open(item);
  }
  onSave(event: any) {

    this.alertService.success();
    this.getIncidentAll();
  }

  async getIncidentAll() {

    this.getNotApprove();
    this.getApprove();
    this.getNotClose();
    this.getClose();
  }


  //อุบัติการณ์ความเสี่ยง รออนุมัติ
  async getNotApprove() {

    try {
      this.openLoading = true;
      if (this.userType === 'ADMIN') {
        const rs: any = await this.incidentService.getNotApprove();
        if (rs.results) {
          this.openLoading = false;
          this.approveNotItems = rs.results;
          // console.log(this.approveNotItems);
        } else {
          this.openLoading = false;
          this.alertService.error(rs.error);
        }
      } else {

        if (this.codeGRP) {
          const rs: any = await this.incidentService.getSelectIn(this.departID, this.codeGRP);
          if (rs.results) {
            this.openLoading = false;
            this.approveNotItems = rs.results;
            // console.log(this.approveNotItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }

        } else {
          const rs: any = await this.incidentService.getSelectInOne(this.departID);
          if (rs.results) {
            this.openLoading = false;
            this.approveNotItems = rs.results;
            // console.log(this.approveNotItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }
        }
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

  //อุบัติการณ์ความเสี่ยง อนุมัติแล้ว
  async getApprove() {
    try {
      this.openLoading = true;
      if (this.userType === 'ADMIN') {
        const rs: any = await this.incidentService.getApprove();
        if (rs.results) {
          this.openLoading = false;
          this.approveItems = rs.results;
          // console.log(this.approveItems);
        } else {
          this.openLoading = false;
          this.alertService.error(rs.error);
        }

      } else {
        if (this.codeGRP) {
          const rs: any = await this.incidentService.getSelectOut(this.departID, this.codeGRP);
          if (rs.results) {
            this.openLoading = false;
            this.approveItems = rs.results;
            // console.log(this.approveItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }

        } else {
          const rs: any = await this.incidentService.getSelectOutOne(this.departID);
          if (rs.results) {
            this.openLoading = false;
            this.approveItems = rs.results;
            // console.log(this.approveItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }
        }
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

  //อุบัติการณ์ความเสี่ยง รอปิด
  async getNotClose() {
    try {
      this.openLoading = true;
      if (this.userType === 'ADMIN') {
        const rs: any = await this.incidentService.getNotClose();
        if (rs.results) {
          this.openLoading = false;
          this.closeNotItems = rs.results;
          // console.log(this.closeNotItems);
        } else {
          this.openLoading = false;
          this.alertService.error(rs.error);
        }

      } else {
        if (this.codeGRP) {
          const rs: any = await this.incidentService.getSelectShowIn(this.departID, this.codeGRP);
          if (rs.results) {
            this.openLoading = false;
            this.closeNotItems = rs.results;
            // console.log(this.closeNotItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }

        } else {
          const rs: any = await this.incidentService.getSelectShowInOne(this.departID);
          if (rs.results) {
            this.openLoading = false;
            this.closeNotItems = rs.results;
            // console.log(this.closeNotItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }
        }
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

  //อุบัติการณ์ความเสี่ยง ปิดแล้ว
  async getClose() {
    try {
      this.openLoading = true;
      if (this.userType === 'ADMIN') {
        const rs: any = await this.incidentService.getClose();
        if (rs.results) {
          this.openLoading = false;
          this.closeItems = rs.results;
          // console.log(this.closeItems);
        } else {
          this.openLoading = false;
          this.alertService.error(rs.error);
        }
      } else {
        if (this.codeGRP) {
          const rs: any = await this.incidentService.getSelectShowOut(this.departID, this.codeGRP);
          if (rs.results) {
            this.openLoading = false;
            this.closeItems = rs.results;
            // console.log(this.closeItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }

        } else {
          const rs: any = await this.incidentService.getSelectShowOutOne(this.departID);
          if (rs.results) {
            this.openLoading = false;
            this.closeItems = rs.results;
            // console.log(this.closeItems);
          } else {
            this.openLoading = false;
            this.alertService.error(rs.error);
          }
        }
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

}
