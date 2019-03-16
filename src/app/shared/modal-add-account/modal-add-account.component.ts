import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { AccountService } from '../account.service'
import { SideService } from 'src/app/shared/side.service';
import { SafetyService } from 'src/app/shared/safety.service';
import { TypeService } from 'src/app/shared/type.service';
import { NotypeService } from 'src/app/shared/notype.service';

@Component({
  selector: 'app-modal-add-account',
  templateUrl: './modal-add-account.component.html',
  styles: []
})
export class ModalAddAccountComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  info: any = {};
  sideItems: any = [];
  safetyItems: any = [];
  typeItems: any = [];
  notypeItems: any = [];

  code: any = [];
  accountId: any;
  codeAccount: any;
  idSide: any;
  idSafety: any;
  idType: any;
  idNotype: any;
  nameAccount: any;
  simple: any;
  statusAcc: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private accountService: AccountService,
    private sideService: SideService,
    private safetyService: SafetyService,
    private typeService: TypeService,
    private notypeService: NotypeService,
  ) { }

  ngOnInit(): void {
  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-account-title',
      keyboard: false,
      backdrop: 'static',
      // size: 'sm',
      centered: true
    });

    this.getlookup();
    this.getSafetyAll();
    this.getTypeAll();
    this.getNotypeAll();

    if (info) {
      this.codeAccount = info.code_account;
      this.idSide = info.id_side;
      this.idSafety = info.id_safety;
      this.idType = info.id_type;
      this.idNotype = info.id_notype;
      this.nameAccount = info.name_account;
      this.simple = info.simple;
      this.statusAcc = info.status_acc;

    } else {
      this.sideItems = null;
      this.safetyItems = null;
      this.typeItems = null;
      this.notypeItems = null;

      this.accountId = null;
      this.codeAccount = null;
      this.idSide = null;
      this.idSafety = null;
      this.idType = null;
      this.idNotype = null;
      this.nameAccount = null;
      this.simple = null;
      this.statusAcc = null;
    }

    this.modalReference.result.then((result) => { });
  }


  dismiss() {
    this.modalReference.close();
    this.accountId = null;
    this.codeAccount = null;
    this.idSide = null;
    this.idSafety = null;
    this.idType = null;
    this.idNotype = null;
    this.nameAccount = null;
    this.simple = null;
    this.statusAcc = null;
  }

  async save() {
    if (this.codeAccount) {
      try {
        const data: any = {
          codeAccount: this.codeAccount,
          idSide: this.idSide,
          idSafety: this.idSafety,
          idType: this.idType,
          idNotype: this.idNotype,
          nameAccount: this.nameAccount,
          simple: this.simple,
          statusAcc: this.statusAcc,
        };

        var isError = false;
        var rs: any;

        if (!isError) {
          if (this.accountId) {
            rs = await this.accountService.update(this.accountId, data);
          } else {
            // console.log(data);
            rs = await this.accountService.save(data);
          }

          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.accountId = null;
            this.codeAccount = null;
            this.idSide = null;
            this.idSafety = null;
            this.idType = null;
            this.idNotype = null;
            this.nameAccount = null;
            this.simple = null;
            this.statusAcc = null;
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          rs = await this.accountService.update(this.accountId, data);
          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.accountId = null;
            this.codeAccount = null;
            this.idSide = null;
            this.idSafety = null;
            this.idType = null;
            this.idNotype = null;
            this.nameAccount = null;
            this.simple = null;
            this.statusAcc = null;
          } else {
            this.alertService.error(rs.message);
          }
          // this.alertService.error('กรุณากรอกรหัสผ่าน')
        }
      } catch (error) {
        // console.log(error);
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } else {
      this.alertService.error('กรุณาระบุชื่อ');
    }
  }

  async getlookup() {
    try {
      const rs: any = await this.sideService.getSide();
      if (rs.results) {
        this.sideItems = rs.results;
        // console.log(this.sideItems);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getSafety(idSides: any) {
    this.safetyItems = null;
    this.typeItems = null;
    this.notypeItems = null;
    try {
      const rs: any = await this.safetyService.getSideShow(idSides);
      if (rs.results) {
        this.safetyItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getSafetyAll() {
    this.safetyItems = null;
    this.typeItems = null;
    this.notypeItems = null;
    try {
      const rs: any = await this.safetyService.getSafety();
      if (rs.results) {
        this.safetyItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getType(idSafety: any) {
    this.typeItems = null;
    this.notypeItems = null;
    try {
      const rs: any = await this.typeService.getSafetyShow(idSafety);
      if (rs.results) {
        this.typeItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getTypeAll() {
    this.typeItems = null;
    this.notypeItems = null;
    try {
      const rs: any = await this.typeService.getType();
      if (rs.results) {
        this.typeItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getNotype(idSype: any) {
    this.notypeItems = null;
    try {
      const rs: any = await this.notypeService.getTypeShow(idSype);
      if (rs.results) {
        this.notypeItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async getNotypeAll() {
    this.notypeItems = null;
    try {
      const rs: any = await this.notypeService.getNotype();
      if (rs.results) {
        this.notypeItems = rs.results;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
