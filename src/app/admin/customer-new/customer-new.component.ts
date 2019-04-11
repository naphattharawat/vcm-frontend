import { CustomersService } from './../customers.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styles: []
})
export class CustomerNewComponent implements OnInit {

  customerId: any;
  title = 'เพิ่มข้อมูลลูกค้า';
  customerAddress: any;
  customerName: any;
  telephones = [];
  contacts = [];
  faxs = [];
  constructor(private customersService: CustomersService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.customerId = params.customerId;
      });
  }


  ngOnInit() {
    if (this.customerId) {
      this.title = 'แก้ไขสินค้า';
      this.getInfo();
      this.getTel();
      this.getFax();
      this.getContact();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.customersService.info(this.customerId);
      if (rs.ok) {
        this.customerAddress = rs.rows.address;
        this.customerName = rs.rows.name;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getTel() {
    try {
      const rs: any = await this.customersService.getTelephone(this.customerId);
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
      const rs: any = await this.customersService.getFax(this.customerId);
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
      const rs: any = await this.customersService.getContact(this.customerId);
      if (rs.ok) {
        this.contacts = rs.rows;
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
    this.faxs[idx].tel = e.target.value;
  }

  changeContactName(e, idx) {
    this.contacts[idx].contact_name = e.target.value;
  }

  changeContactTel(e, idx) {
    this.contacts[idx].contact_tel = e.target.value;
  }
}
