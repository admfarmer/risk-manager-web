import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LevelService } from 'src/app/shared/level.service'

import { ModalAddLevelComponent } from 'src/app/shared/modal-add-level/modal-add-level.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styles: []
})
export class LevelComponent implements OnInit {

  @ViewChild('mdlLevel') private mdlLevel: ModalAddLevelComponent;

  jwtHelper: JwtHelperService = new JwtHelperService();
  openLoading: boolean;
  searchText: string;

  idcard: any;
  levelId: any;
  levelItems: any;
  userType: any;
  codeLevel: any;

  constructor(
    private levelService: LevelService,
    private alertService: AlertService,
  ) {
    this.idcard = sessionStorage.getItem('idcard');

    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.userType = decoded.userType;
    // console.log(decoded);
  }

  ngOnInit() {
    this.getLevels();
  }

  openRegister() {
    this.levelId = null;
    this.mdlLevel.open();
  }

  openEdit(item: any) {
    this.mdlLevel.open(item);
  }
  onSave(event: any) {
    this.alertService.success();
    this.getLevels();
  }

  async getLevels() {
    try {
      this.openLoading = true;
      const rs: any = await this.levelService.getLevel();
      if (rs.results) {
        this.openLoading = false;
        this.levelItems = rs.results;
        // console.log(this.levelItems);
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

  async remove(levelId: any) {
    // console.log(levelId);
    try {
      if (levelId) {
        const rs: any = await this.levelService.remove(levelId);
        this.alertService.success();
        this.getLevels();
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
