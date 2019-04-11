import { CustomersService } from './../customers.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as _ from 'lodash';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {

  customers: any = [];
  totalCustomers: any;
  perPage = 10;
  query = '';
  constructor(
    private alertService: AlertService,
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }


  async getCustomers() {
    try {
      // this.modalLoading.show();
      let rs: any;
      if (this.query) {
        rs = await this.customersService.search(this.query);
      } else {
        rs = await this.customersService.list();
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.customers = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }

    } catch (error) {
      // this.modalLoading.hide();
      this.alertService.serverError();
      console.log(error.message);
    }
  }

  async search(e: any) {
    if (e.keyCode === 13) {
      try {
        const rs: any = await this.customersService.search(this.query);
        if (rs.ok) {
          this.customers = rs.rows;
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error);
      }

    }
  }

  async delete(productId) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.customersService.delete(productId);
          const idx = _.findIndex(this.customers, { 'product_id': productId });
          if (idx > -1) {
            this.customers.splice(idx, 1);
          }
        }
      });
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
