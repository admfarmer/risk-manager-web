import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { LevelService } from '../level.service'

@Component({
  selector: 'app-modal-add-level',
  templateUrl: './modal-add-level.component.html',
  styles: []
})
export class ModalAddLevelComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  info: any = {};

  code: any = [];
  codeLevel: any;
  nameLevel: any;
  groupLevel: any;
  levelId: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private levelService: LevelService,
  ) {
    this.code = ['1', '2', '3', '4', '5', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  }

  ngOnInit(): void {
  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-level-title',
      keyboard: false,
      backdrop: 'static',
      // size: 'sm',
      centered: true
    });

    // console.log(info);


    if (info) {
      this.levelId = info.id_level;
      this.codeLevel = info.code_level;
      this.nameLevel = info.name_level;
      this.groupLevel = info.group_level;

    } else {
      this.levelId = null;
      this.codeLevel = null;
      this.nameLevel = null;
      this.groupLevel = null;
    }

    this.modalReference.result.then((result) => { });
  }


  dismiss() {
    this.modalReference.close();
    this.levelId = null;
    this.codeLevel = null;
    this.nameLevel = null;
    this.groupLevel = null;
  }

  async save() {
    if (this.codeLevel) {
      try {
        const data: any = {
          codeLevel: this.codeLevel,
          nameLevel: this.nameLevel,
          groupLevel: this.groupLevel,
        };

        var isError = false;
        var rs: any;

        if (!isError) {
          if (this.levelId) {
            rs = await this.levelService.update(this.levelId, data);
          } else {
            // console.log(data);
            rs = await this.levelService.save(data);
          }

          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.levelId = null;
            this.codeLevel = null;
            this.nameLevel = null;
            this.groupLevel = null;
          } else {
            this.alertService.error(rs.message);
          }
        } else {
          rs = await this.levelService.update(this.levelId, data);
          if (rs.statusCode === 200) {
            this.modalReference.close();
            this.onSave.emit();
            this.levelId = null;
            this.codeLevel = null;
            this.nameLevel = null;
            this.groupLevel = null;
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

}
