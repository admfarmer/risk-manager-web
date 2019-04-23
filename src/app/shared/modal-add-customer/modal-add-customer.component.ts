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
  persons: any = [];
  titles: any = [];
  sexs: any = [];
  positions: any = [];
  departs: any = [];
  info: any = {};

  userType: any;
  userId: any;
  // idcard: any;
  username: any;
  password: any;
  isAccept: any;
  chiefUser: any;
  managerUser: any;

  id_person: any;
  idcard: any;
  title: any;
  first_name: any;
  last_name: any;
  title_en: any;
  fname_en: any;
  lname_en: any;
  sex: any;
  position: any;
  addr: any;
  bdate: any;
  workdate: any;
  depart: any;
  typetext: any;
  personla: any;
  telephone: any;
  email: any;
  quality: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private personService: PersonService,
    private usernameService: UsernameService
  ) { }

  ngOnInit(): void {
    this.getShowAll();
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
      this.id_person = info.id_person;
      this.idcard = info.idcard;
      this.title = info.title;
      this.first_name = info.first_name;
      this.last_name = info.last_name;
      this.title_en = info.title_en;
      this.fname_en = info.fname_en;
      this.lname_en = info.lname_en;
      this.sex = info.sex;
      this.position = info.position;
      this.addr = info.addr;
      this.bdate = info.bdate;
      this.workdate = info.workdate;
      this.depart = info.depart;
      this.typetext = info.typetext;
      this.personla = info.personla || 'N';
      this.telephone = info.telephone;
      this.email = info.email;
      this.quality = info.quality || 'N';
      this.getPersons();

    } else {
      this.id_person = null;
      this.idcard = null;
      this.title = null;
      this.first_name = null;
      this.last_name = null;
      this.title_en = null;
      this.fname_en = null;
      this.lname_en = null;
      this.sex = null;
      this.position = null;
      this.addr = null;
      this.bdate = null;
      this.workdate = null;
      this.depart = null;
      this.typetext = null;
      this.personla = null;
      this.telephone = null;
      this.email = null;
      this.quality = null;
      this.getPersons();
    }

    this.modalReference.result.then((result) => { });
  }


  dismiss() {
    this.modalReference.close();
    this.id_person = null;
    this.idcard = null;
    this.title = null;
    this.first_name = null;
    this.last_name = null;
    this.title_en = null;
    this.fname_en = null;
    this.lname_en = null;
    this.sex = null;
    this.position = null;
    this.addr = null;
    this.bdate = null;
    this.workdate = null;
    this.depart = null;
    this.typetext = null;
    this.personla = null;
    this.telephone = null;
    this.email = null;
    this.quality = null;
  }

  async save() {
    if (this.idcard) {
      try {
        const data: any = {
          // id_person: this.id_person,
          idcard: this.idcard,
          title: this.title,
          first_name: this.first_name,
          last_name: this.last_name,
          title_en: this.title_en,
          fname_en: this.fname_en,
          lname_en: this.lname_en,
          sex: this.sex,
          position: this.position,
          addr: this.addr,
          bdate: this.bdate,
          workdate: this.workdate,
          depart: this.depart,
          typetext: this.typetext,
          personla: this.personla,
          telephone: this.telephone,
          email: this.email,
          quality: this.quality
        };

        let isError = false;
        let rs: any;
        if (!this.id_person) {
          // console.log(data);
          rs = await this.usernameService.save(data);

          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.id_person = null;
            this.idcard = null;
            this.title = null;
            this.first_name = null;
            this.last_name = null;
            this.title_en = null;
            this.fname_en = null;
            this.lname_en = null;
            this.sex = null;
            this.position = null;
            this.addr = null;
            this.bdate = null;
            this.workdate = null;
            this.depart = null;
            this.typetext = null;
            this.personla = null;
            this.telephone = null;
            this.email = null;
            this.quality = null;
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          rs = await this.usernameService.update(this.id_person, data);
          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.id_person = null;
            this.idcard = null;
            this.title = null;
            this.first_name = null;
            this.last_name = null;
            this.title_en = null;
            this.fname_en = null;
            this.lname_en = null;
            this.sex = null;
            this.position = null;
            this.addr = null;
            this.bdate = null;
            this.workdate = null;
            this.depart = null;
            this.typetext = null;
            this.personla = null;
            this.telephone = null;
            this.email = null;
            this.quality = null;
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
          this.persons = rs.results;
          // console.log(this.person);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.personService.getSelectjoin();
        if (rs.results) {
          this.persons = rs.results;
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

  async getTitles() {
    try {
      const rs: any = await this.personService.Title();
      if (rs.results) {
        this.titles = rs.results;
        // console.log(this.titles);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getSexs() {
    try {
      const rs: any = await this.personService.Sex();
      if (rs.results) {
        this.sexs = rs.results;
        // console.log(this.sexs);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getPositions() {
    try {
      const rs: any = await this.personService.Position();
      if (rs.results) {
        this.positions = rs.results;
        // console.log(this.positions);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getDeparts() {
    try {
      const rs: any = await this.personService.Depart();
      if (rs.results) {
        this.departs = rs.results;
        // console.log(this.departs);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getShowAll() {
    this.getTitles();
    this.getSexs();
    this.getPositions();
    this.getDeparts();
  }
}
