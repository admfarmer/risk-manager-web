import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from '../alert.service';
import { IncidentService } from '../incident.service';
import { PersonService } from '../person.services';
import { LevelService } from '../level.service';
import { SideService } from '../side.service';
import { SafetyService } from '../safety.service';
import { TypeService } from '../type.service';
import { NotypeService } from '../notype.service';
import { AccountService } from '../account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-add-incident',
  templateUrl: './modal-add-incident.component.html',
  styles: []
})
export class ModalAddIncidentComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  modalReference: NgbModalRef;
  incidents: any = [];

  users: any = [];
  persons: any = [];
  sexs: any = [];
  positions: any = [];
  departs: any = [];
  affecteds: any = [];
  locations: any = [];
  times: any = [];
  levels: any = [];
  sides: any = [];
  safetys: any = [];
  types: any = [];
  notypes: any = [];
  accounts: any = [];


  info: any = {};
  ages: any = {};
  dateTo: any = Date();

  isSex = false;
  isAge = false;

  idcard: any;
  departID: any;
  departGRP: any;
  codeGRP: any;

  id_incident: any;
  hn_incident: any;
  idcard_incident: any;
  dep_rep_id: any;
  dep_res_id: any;
  id_side: any;
  id_safety: any;
  id_type: any;
  id_notype: any;
  code_account: any;
  affected_id: any;
  sex_incident: any;
  age_incident: any;
  location_incident: any;
  date_incident: any;
  date_account: any;
  time_incident: any;
  agents_involved: any;
  code_level: any;
  other_involved: any;
  noteceo: any;
  date_rep: any;
  date_res: any;
  resulting_actions: any;
  conf_output: any;
  conf_chief: any;
  conf_nrls: any;
  near_miss_status: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private personService: PersonService,
    private incidentService: IncidentService,
    private levelService: LevelService,
    private sideService: SideService,
    private safetyService: SafetyService,
    private typeService: TypeService,
    private notypeService: NotypeService,
    private accountService: AccountService,

  ) {
    this.ages = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
      43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
      77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99, 100
    ];
    this.idcard = sessionStorage.getItem('idcard');
    this.departID = sessionStorage.getItem('departID');
    this.departGRP = sessionStorage.getItem('departGRP');
    this.codeGRP = sessionStorage.getItem('codeGRP');

  }

  ngOnInit(): void {
    this.getShowAll();
    this.getSides();

  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'md',
      centered: true
    });

    console.log(info);

    if (info) {
      this.id_incident = info.id_incident;
      this.hn_incident = info.hn_incident;
      this.idcard_incident = info.idcard_incident;
      this.dep_rep_id = info.dep_rep_id;
      this.dep_res_id = info.dep_res_id;

      this.id_side = info.id_side;
      this.id_safety = info.id_safety;
      this.id_type = info.id_type;
      this.id_notype = info.id_notype;
      this.code_account = info.code_account;

      this.affected_id = info.affected_id || null;

      this.sex_incident = info.sex_incident || null;
      this.age_incident = info.age_incident || null;
      this.location_incident = info.location_incident;

      this.date_incident = moment(info.date_incident).format('YYYY-MM-DD');
      this.date_account = moment(info.date_account).format('YYYY-MM-DD');
      this.time_incident = info.time_incident;
      this.agents_involved = info.agents_involved;
      this.code_level = info.code_level;
      this.other_involved = info.other_involved;
      this.noteceo = info.noteceo;
      this.date_rep = moment(info.date_rep).format('YYYY-MM-DD');
      this.date_res = moment(info.date_res).format('YYYY-MM-DD');
      this.resulting_actions = info.resulting_actions;
      this.conf_output = info.conf_output;
      this.conf_chief = info.conf_chief;
      this.conf_nrls = info.conf_nrls;
      this.near_miss_status = info.near_miss_status;

      console.log(info.affected_id);
      if (info.affected_id == '1') {
        this.isSex = true;
        this.isAge = true;
      } else {
        this.isSex = false;
        this.isAge = false;
      }

      this.getPersons();
      this.getShowIncident();

    } else {
      this.id_incident = null;
      this.hn_incident = null;
      this.idcard_incident = this.idcard;
      this.dep_rep_id = this.departID;
      this.dep_res_id = null;
      this.id_side = null;
      this.id_safety = null;
      this.id_type = null;
      this.id_notype = null;
      this.code_account = null;
      this.affected_id = null;
      this.sex_incident = null;
      this.age_incident = null;
      this.location_incident = null;
      this.date_incident = null;
      this.date_account = moment(this.dateTo).format('YYYY-MM-DD');
      this.time_incident = null;
      this.agents_involved = null;
      this.code_level = null;
      this.other_involved = null;
      this.noteceo = null;
      this.date_rep = null;
      this.date_res = null;
      this.resulting_actions = null;
      this.conf_output = null;
      this.conf_chief = null;
      this.conf_nrls = null;
      this.near_miss_status = null;
      this.getPersons();
    }

    this.modalReference.result.then((result) => { });
  }


  dismiss() {
    this.modalReference.close();
    this.id_incident = null;
    this.hn_incident = null;
    this.idcard_incident = null;
    this.dep_rep_id = null;
    this.dep_res_id = null;
    this.id_side = null;
    this.id_safety = null;
    this.id_type = null;
    this.id_notype = null;
    this.code_account = null;
    this.affected_id = null;
    this.sex_incident = null;
    this.age_incident = null;
    this.location_incident = null;
    this.date_incident = null;
    this.date_account = null;
    this.time_incident = null;
    this.agents_involved = null;
    this.code_level = null;
    this.other_involved = null;
    this.noteceo = null;
    this.date_rep = null;
    this.date_res = null;
    this.resulting_actions = null;
    this.conf_output = null;
    this.conf_chief = null;
    this.conf_nrls = null;
    this.near_miss_status = null;
  }

  async save() {
    if (this.idcard_incident) {
      try {
        const data: any = {
          // id_incident: this.id_incident,
          hn_incident: this.hn_incident,
          idcard_incident: this.idcard_incident,
          dep_rep_id: this.dep_rep_id,
          dep_res_id: this.dep_res_id,
          id_side: this.id_side,
          id_safety: this.id_safety,
          id_type: this.id_type,
          id_notype: this.id_notype,
          code_account: this.code_account,
          affected_id: this.affected_id,
          sex_incident: this.sex_incident,
          age_incident: this.age_incident,
          location_incident: this.location_incident,
          date_incident: this.date_incident,
          date_account: this.date_account,
          time_incident: this.time_incident,
          agents_involved: this.agents_involved,
          code_level: this.code_level,
          other_involved: this.other_involved,
          noteceo: this.noteceo,
          date_rep: this.date_rep,
          date_res: this.date_res,
          resulting_actions: this.resulting_actions,
          conf_output: this.conf_output,
          conf_chief: this.conf_chief,
          conf_nrls: this.conf_nrls,
          near_miss_status: this.near_miss_status
        };

        let isError = false;
        let rs: any;
        if (!this.id_incident) {
          // console.log(data);
          rs = await this.incidentService.save(data);

          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.id_incident = null;
            this.hn_incident = null;
            this.idcard_incident = null;
            this.dep_rep_id = null;
            this.dep_res_id = null;
            this.id_side = null;
            this.id_safety = null;
            this.id_type = null;
            this.id_notype = null;
            this.code_account = null;
            this.affected_id = null;
            this.sex_incident = null;
            this.age_incident = null;
            this.location_incident = null;
            this.date_incident = null;
            this.date_account = null;
            this.time_incident = null;
            this.agents_involved = null;
            this.code_level = null;
            this.other_involved = null;
            this.noteceo = null;
            this.date_rep = null;
            this.date_res = null;
            this.resulting_actions = null;
            this.conf_output = null;
            this.conf_chief = null;
            this.conf_nrls = null;
            this.near_miss_status = null;
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          rs = await this.incidentService.update(this.id_incident, data);
          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.id_incident = null;
            this.hn_incident = null;
            this.idcard_incident = null;
            this.dep_rep_id = null;
            this.dep_res_id = null;
            this.id_side = null;
            this.id_safety = null;
            this.id_type = null;
            this.id_notype = null;
            this.code_account = null;
            this.affected_id = null;
            this.sex_incident = null;
            this.age_incident = null;
            this.location_incident = null;
            this.date_incident = null;
            this.date_account = null;
            this.time_incident = null;
            this.agents_involved = null;
            this.code_level = null;
            this.other_involved = null;
            this.noteceo = null;
            this.date_rep = null;
            this.date_res = null;
            this.resulting_actions = null;
            this.conf_output = null;
            this.conf_chief = null;
            this.conf_nrls = null;
            this.near_miss_status = null;
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

      if (this.idcard_incident) {
        const rs: any = await this.personService.getSelectcard(this.idcard_incident);
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

  async getlevels() {
    if (this.id_side) {
      try {
        const rs: any = await this.levelService.getSelect(this.id_side);
        if (rs.results) {
          this.levels = rs.results;
          // console.log(this.levels);
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        // console.log(error);
        this.alertService.error(error);
      }
    } else {
      try {
        const rs: any = await this.levelService.getLevel();
        if (rs.results) {
          this.levels = rs.results;
          // console.log(this.levels);
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        // console.log(error);
        this.alertService.error(error);
      }
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

  async getTimes() {
    try {
      const rs: any = await this.incidentService.Time();
      if (rs.results) {
        this.times = rs.results;
        // console.log(this.times);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getLocations() {
    try {
      const rs: any = await this.incidentService.Location();
      if (rs.results) {
        this.locations = rs.results;
        // console.log(this.locations);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      // console.log(error);
      this.alertService.error(error);
    }
  }

  async getAffecteds() {
    try {
      const rs: any = await this.incidentService.Affected();
      if (rs.results) {
        this.affecteds = rs.results;
        // console.log(this.affecteds);
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
    this.getAffecteds();
    this.getPersons();
    this.getSexs();
    this.getPositions();
    this.getLocations();
    this.getDeparts();
    this.getTimes();
    this.getSexs();
    this.getlevels();
  }

  async getShowIncident() {
    this.getSides();
    this.getSafetys();
    this.getTypes();
    this.getNoTypes();
    this.getAccounts();
  }

  async getSides() {
    try {
      const rs: any = await this.sideService.getSide();
      if (rs.results) {
        this.sides = rs.results;
        // console.log(this.sides);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  Safety(idSide) {
    this.id_side = idSide.value;
    console.log(this.id_side);
    if (this.id_side) {
      this.getSafetys();
      this.getlevels();
      this.id_safety = null;
      this.id_type = null;
      this.id_notype = null;
    }
  }
  Types(idSafety) {
    this.id_safety = idSafety.value;
    console.log(this.id_safety);
    if (this.id_safety) {
      this.getTypes();
      this.id_type = null;
      this.id_notype = null;
    }
  }
  NoTypes(idType) {
    this.id_type = idType.value;
    console.log(this.id_type);
    if (this.id_type) {
      this.getNoTypes();
      this.id_notype = null;
    }
  }

  Showacc(idNotype) {
    this.id_notype = idNotype.value;
    console.log(this.id_notype);
    if (this.id_side && this.id_safety && this.id_notype && this.id_type) {
      this.ShowAccount();
    }

  }


  Affected(affectedId) {
    this.affected_id = affectedId.value;
    console.log(this.affected_id);
    if (this.affected_id === '1') {
      this.isSex = true;
      this.isAge = true;
    } else {
      this.isSex = false;
      this.isAge = false;
    }
  }


  async getSafetys() {
    try {
      if (this.id_side) {
        const rs: any = await this.safetyService.getSideShow(this.id_side);
        if (rs.results) {
          this.safetys = rs.results;
          // console.log(this.safetys);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.safetyService.getSafety();
        if (rs.results) {
          this.safetys = rs.results;
          // console.log(this.safetys);
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getTypes() {
    try {
      if (this.id_safety) {
        const rs: any = await this.typeService.getSafetyShow(this.id_safety);
        if (rs.results) {
          this.types = rs.results;
          // console.log(this.types);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.typeService.getType();
        if (rs.results) {
          this.types = rs.results;
          // console.log(this.types);
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getNoTypes() {
    try {
      if (this.id_type) {
        const rs: any = await this.notypeService.getTypeShow(this.id_type);
        if (rs.results) {
          this.notypes = rs.results;
          // console.log(this.notypes);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.notypeService.getNotype();
        if (rs.results) {
          this.notypes = rs.results;
          // console.log(this.notypes);
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getAccounts() {
    try {
      if (this.code_account) {
        const rs: any = await this.accountService.getSelectacc(this.code_account);
        if (rs.results) {
          this.accounts = rs.results;
          // console.log(this.accounts);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        const rs: any = await this.accountService.getAccount();
        if (rs.results) {
          this.accounts = rs.results;
          // console.log(this.accounts);
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async ShowAccount() {
    try {
      if (this.id_side && this.id_safety && this.id_notype && this.id_type) {
        const rs: any = await this.accountService.getSelect(this.id_side, this.id_safety, this.id_type, this.id_notype);
        if (rs.results) {
          this.accounts = rs.results;
          console.log(this.accounts);
        } else {
          this.alertService.error(rs.error);
        }
      } else {
        console.log('ไม่พบข้อมูล');
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
