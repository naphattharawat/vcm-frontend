import { LabelersService } from './../labelers.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-labelers',
  templateUrl: './labelers.component.html',
  styles: []
})
export class LabelersComponent implements OnInit {

  labelers: any = [];
  perPage = 10;
  query = '';
  constructor(
    private alertService: AlertService,
    private labelersService: LabelersService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }


  async getCustomers() {
    try {
      // this.modalLoading.show();
      let rs: any;
      if (this.query) {
        rs = await this.labelersService.search(this.query);
      } else {
        rs = await this.labelersService.list();
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.labelers = rs.rows;
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
        const rs: any = await this.labelersService.search(this.query);
        if (rs.ok) {
          this.labelers = rs.rows;
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error);
      }

    }
  }

  async delete(labelerId) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.labelersService.delete(labelerId);
          const idx = _.findIndex(this.labelers, { 'supplier_id': labelerId });
          if (idx > -1) {
            this.labelers.splice(idx, 1);
          }
        }
      });
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
