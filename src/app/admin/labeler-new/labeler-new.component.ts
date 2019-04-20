import { LabelersService } from './../labelers.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-labeler-new',
  templateUrl: './labeler-new.component.html',
  styles: []
})
export class LabelerNewComponent implements OnInit {

  perPage = 20;
  labelerId: any;
  title = 'เพิ่มข้อมูลผู้ผลิต/ผู้จำหน่าย';
  labelerAddress: any;
  labelerName: any;
  telephones = [];
  contacts = [];
  faxs = [];
  products = [];
  isUpdate: any;
  constructor(
    private labelersService: LabelersService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.labelerId = params.labelerId;
      });
  }

  async ngOnInit() {
    if (this.labelerId) {
      this.isUpdate = true;
      this.title = 'แก้ไขข้อมูลผู้ผลิต/ผู้จำหน่าย';
      await this.getInfo();
      await this.getTel();
      await this.getFax();
      await this.getContact();
      await this.getProduct();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.labelersService.info(this.labelerId);
      if (rs.ok) {
        this.labelerAddress = rs.rows.address;
        this.labelerName = rs.rows.supplier_name;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getTel() {
    try {
      const rs: any = await this.labelersService.getTelephone(this.labelerId);
      if (rs.ok) {
        this.telephones = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getFax() {
    try {
      const rs: any = await this.labelersService.getFax(this.labelerId);
      if (rs.ok) {
        this.faxs = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getContact() {
    try {
      const rs: any = await this.labelersService.getContact(this.labelerId);
      if (rs.ok) {
        this.contacts = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getProduct() {
    try {
      const rs: any = await this.labelersService.getProduct(this.labelerId);
      if (rs.ok) {
        this.products = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  addTel() {
    this.telephones.push({ tel: null });
  }

  addFax() {
    this.faxs.push({ fax: null });
  }

  addContact() {
    this.contacts.push({ contact_name: null, contact_tel: null });
  }

  removeTel(idx) {
    this.telephones.splice(idx, 1);
  }

  removeFax(idx) {
    this.faxs.splice(idx, 1);
  }

  removeContact(idx) {
    this.contacts.splice(idx, 1);
  }

  changeTel(e, idx) {
    this.telephones[idx].tel = e.target.value;
  }

  changeFax(e, idx) {
    this.faxs[idx].fax = e.target.value;
  }

  changeContactName(e, idx) {
    this.contacts[idx].contact_name = e.target.value;
  }

  changeContactTel(e, idx) {
    this.contacts[idx].contact_tel = e.target.value;
  }

  // async deleteMachine(machineId) {
  //   try {
  //     const rs: any = await this.labelersService.removeMachineCustomer(machineId);
  //     if (rs.ok) {
  //       await this.getMachine();
  //       this.alertService.success();
  //     } else {
  //       this.alertService.error(rs.error);
  //     }
  //   } catch (error) {
  //     this.alertService.error(error);
  //   }
  // }

  async save() {
    try {
      let rs: any;
      // update
      if (this.isUpdate) {
        const obj: any = {
          supplier_name: this.labelerName,
          address: this.labelerAddress
        };
        rs = await this.labelersService.update(this.labelerId, obj);
      } else {
        // save
        const obj: any = {
          supplier_name: this.labelerName,
          address: this.labelerAddress,
          status: 1
        };
        rs = await this.labelersService.save(obj);
        this.labelerId = rs.rows;
      }

      if (rs.ok) {
        await this.saveTel();
        await this.saveFax();
        await this.saveContact();
        if (this.isUpdate) {
          this.alertService.success();
        } else {
          this.alertService.success();
          this.router.navigate(['/admin/labeler-new'], { queryParams: { labelerId: this.labelerId } });
        }
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async saveTel() {
    try {
      await this.labelersService.saveTel(this.labelerId, this.telephones);
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }
  async saveFax() {
    try {
      await this.labelersService.saveFax(this.labelerId, this.faxs);
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }
  async saveContact() {
    try {
      await this.labelersService.saveContact(this.labelerId, this.contacts);
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

}
