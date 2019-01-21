import { AlertService } from './../../alert.service';
import { ReceiveService } from './../receive.service';
import { Component, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as _ from 'lodash';
@Component({
  selector: 'app-receives',
  templateUrl: './receives.component.html',
  styles: []
})
export class ReceivesComponent implements OnInit {

  query: any;
  receives = [];
  totalReceive: any;
  perPage = 20;
  constructor(
    private receiveService: ReceiveService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async refresh(state: ClrDatagridStateInterface) {
    // this.modalLoading.show();
    const offset = +state.page.from;
    const limit = +state.page.size;

    try {
      let rs: any;
      if (this.query) {
        rs = await this.receiveService.search(this.query, limit, offset);
      } else {
        rs = await this.receiveService.list(limit, offset);
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.receives = rs.rows;
        this.totalReceive = rs.total;
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
        const rs: any = await this.receiveService.search(this.query, this.perPage, 0);
        if (rs.ok) {
          this.receives = rs.rows;
          this.totalReceive = rs.total;
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error);
      }

    }
  }

  async delete(receiveId: any) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.receiveService.delete(receiveId);
          const idx = _.findIndex(this.receives, { 'receive_id': receiveId });
          if (idx > -1) {
            this.receives[idx].is_deleted = 'Y';
          }
        }
      });
    } catch (error) {
      this.alertService.error(error);
    }
  }

}
