import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { UsernameService } from '../username.service';
import { PersonService } from '../person.services'

@Component({
  selector: 'app-modal-add-customer',
  templateUrl: './modal-add-customer.component.html',
  styles: []
})
export class ModalAddCustomerComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  users: any = [];
  person: any = [];
  info: any = {};

  userType: any;
  userId: any;
  idcard: any;
  username: any;
  password: any;
  isAccept: any;
  chiefUser: any;
  managerUser: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private personService: PersonService,
    private usernameService: UsernameService
  ) { }

  ngOnInit(): void {
  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      // size: 'sm',
      centered: true
    });

    if (info) {
      this.password = null;
      this.userId = info.id_user;
      this.idcard = info.idcard;
      this.username = info.username;
      this.userType = info.user_type;
      this.isAccept = info.is_accept || 'N';
      this.chiefUser = info.chief_user || '';
      this.managerUser = info.maniger_user || '';
      this.getPersons();

    } else {
      this.userId = null;
      this.idcard = null;
      this.username = null;
      this.password = null;
      this.getPersons();
    }

    this.modalReference.result.then((result) => { });
  }


  dismiss() {
    this.modalReference.close();
    this.password = null;
    this.idcard = null;
    this.userId = null;
    this.username = null;
    this.isAccept = null || 'N';
    this.chiefUser = null || '';
    this.managerUser = null || '';

  }

  async save() {
    if (this.username) {
      try {
        const data: any = {
          username: this.username,
          idcard: this.idcard,
          userType: this.userType,
          isAccept: this.isAccept || 'N',
          chiefUser: this.chiefUser || '',
          managerUser: this.managerUser || ''
        };

        var isError = false;
        if (this.userId) {
          if (!this.password) {
            isError = true;
          } else {
            isError = false;
            data.password = this.password;
          }
        } else {
          if (!this.password) {
            isError = true;
          } else {
            isError = false;
          }
        }

        data.password = this.password;

        var rs: any;
        if (!isError) {
          if (this.userId) {
            rs = await this.usernameService.update(this.userId, data);
          } else {

            console.log(data);

            rs = await this.usernameService.save(data);

          }

          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.password = null;
            this.idcard = null;
            this.userId = null;
            this.username = null;
            this.isAccept = null || 'N';
            this.chiefUser = null || '';
            this.managerUser = null || '';
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          rs = await this.usernameService.update(this.userId, data);
          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.password = null;
            this.idcard = null;
            this.userId = null;
            this.username = null;
            this.chiefUser = null || '';
            this.managerUser = null || '';
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

  async getPersons() {
    try {

      if (this.idcard) {
        const rs: any = await this.personService.getSelectcard(this.idcard);
        if (rs.results) {
          this.person = rs.results;
          // console.log(this.person);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.personService.getSelectjoin();
        if (rs.results) {
          this.person = rs.results;
          // console.log(this.person);
        } else {
          this.alertService.error(rs.error);
        }
      }

    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }


}
