import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ModalAddCustomerComponent } from 'src/app/shared/modal-add-customer/modal-add-customer.component';
import { PersonService } from 'src/app/shared/person.services'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: []
})
export class CustomerComponent implements OnInit {
  @ViewChild('mdlPerson') private mdlPersons: ModalAddCustomerComponent;
  jwtHelper: JwtHelperService = new JwtHelperService();

  openLoading: boolean;
  searchText: string;

  idcard: any;
  personId: any;
  personItems: any;
  userType: any;

  constructor(
    private personService: PersonService,
    private alertService: AlertService,
  ) {
    this.idcard = sessionStorage.getItem('idcard');

    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.userType = decoded.userType;

    // console.log(decoded);
  }

  ngOnInit() {
    this.getPersons();
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
    this.getPersons();
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
