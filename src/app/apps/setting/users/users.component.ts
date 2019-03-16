import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsernameService } from 'src/app/shared/username.service';
import { PersonService } from 'src/app/shared/person.services'

import { ModalAddUserComponent } from 'src/app/shared/modal-add-user/modal-add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  @ViewChild('mdlUser') private mdlUser: ModalAddUserComponent;

  searchText: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  idcard: any;
  userId: any;
  openLoading: boolean;
  userItems: any;
  personItems: any;
  userType: any;

  constructor(
    private personService: PersonService,
    private alertService: AlertService,
    private userService: UsernameService

  ) {
    this.idcard = sessionStorage.getItem('idcard');

    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.userType = decoded.userType;
    // console.log(decoded);
  }

  ngOnInit() {
    this.getUsername();
  }

  openRegister() {
    this.userId = null;
    this.mdlUser.open();
  }

  openEdit(item: any) {
    // console.log(item);
    this.mdlUser.open(item);
  }
  onSave(event: any) {
    this.alertService.success();
    this.getUsername();
  }

  async getUsername() {
    try {

      this.openLoading = true;
      const rs: any = await this.userService.selectID(this.idcard);
      if (rs.results) {
        this.openLoading = false;
        this.userItems = rs.results;
        // console.log(this.userItems);
      } else {
        this.openLoading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }



  async getPersons() {
    try {
      this.openLoading = true;
      const rs: any = await this.personService.personStatus(this.idcard);
      if (rs.results) {
        this.openLoading = false;
        this.personItems = rs.results;
        // console.log(this.personItems);
      } else {
        this.openLoading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

}
