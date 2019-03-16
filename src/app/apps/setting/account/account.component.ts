import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/shared/account.service';

import { ModalAddAccountComponent } from 'src/app/shared/modal-add-account/modal-add-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: []
})
export class AccountComponent implements OnInit {
  @ViewChild('mdlAccount') private mdlAccount: ModalAddAccountComponent;

  jwtHelper: JwtHelperService = new JwtHelperService();

  openLoading: boolean;
  searchText: string;
  lookup: any = [];

  idcard: any;
  accountId: any;
  accountItems: any = [];
  userType: any = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
  ) {
    this.idcard = sessionStorage.getItem('idcard');

    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.userType = decoded.userType;
    // console.log(decoded);
  }

  ngOnInit() {
    this.getAccount();
  }

  openRegister() {
    this.accountId = null;
    this.mdlAccount.open();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlAccount.open(item);
  }
  onSave(event: any) {
    this.alertService.success();
    this.getAccount();
  }

  async getAccount() {
    try {
      this.openLoading = true;
      const rs: any = await this.accountService.getAccount();
      if (rs.results) {
        this.openLoading = false;
        this.accountItems = rs.results;
      } else {
        this.openLoading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

  async remove(accountId: any) {
    // console.log(accountId);
    try {
      if (accountId) {
        const rs: any = await this.accountService.remove(accountId);
        this.alertService.success();
        this.getAccount();
      } else {
        this.alertService.error('ไม่พบข้อมูลที่ต้องการลบ');
      }
    } catch (error) {
      // console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }
}
