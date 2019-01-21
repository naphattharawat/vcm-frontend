import { MachinesService } from './../machines.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as _ from 'lodash';
@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines = [];
  totalMachines: any;
  perPage = 10;
  query = '';
  constructor(
    private machinesService: MachinesService,
    private alertService: AlertService,
    @Inject('API_URL') private url: string,
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
        rs = await this.machinesService.search(this.query, limit, offset);
      } else {
        rs = await this.machinesService.all(limit, offset);
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.machines = rs.rows;
        for (const p of this.machines) {
          if (p.picture != null && p.picture != '') {
            p.picture = this.url + '/' + p.picture;
          } else {
            p.picture = null;
          }
        }
        this.totalMachines = rs.total;
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
        const rs: any = await this.machinesService.search(this.query, this.perPage, 0);
        if (rs.ok) {
          this.machines = rs.rows;
          this.totalMachines = rs.total;
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error);
      }

    }
  }

  async delete(machineId) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.machinesService.delete(machineId);
          const idx = _.findIndex(this.machines, { 'machine_id': machineId });
          if (idx > -1) {
            this.machines.splice(idx, 1);
          }
        }
      });
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
