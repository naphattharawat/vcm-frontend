import { AlertService } from './../../alert.service';
import { MachinesService } from './../machines.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-machine-new',
  templateUrl: './machine-new.component.html',
  styleUrls: ['./machine-new.component.css']
})
export class MachineNewComponent implements OnInit {

  file: Array<File>;
  fileName: any;

  machineNameTH: any;
  machineNameEN: any;
  model: any;
  serial: any;
  year: any;
  costOther: any;
  costOtherCurrency: any;
  cost: any;
  price: any;
  keyword: any;
  note: any;
  machineId;
  title = 'เพิ่มเครื่องพิมพ์';
  constructor(
    private machinesService: MachinesService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
        this.machineId = params.machineId;
      });
  }

  ngOnInit() {
    if (this.machineId) {
      this.title = 'แก้ไขเครื่องพิมพ์';
      this.getInfo();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.machinesService.info(this.machineId);
      if (rs.ok) {
        this.machineNameEN = rs.rows.machine_name_en;
        this.machineNameTH = rs.rows.machine_name_th;
        this.serial = rs.rows.serial;
        this.model = rs.rows.model;
        this.year = rs.rows.year;
        this.cost = rs.rows.cost;
        this.price = rs.rows.price;
        this.costOtherCurrency = rs.rows.cost_other_currency;
        this.costOther = rs.rows.cost_other;
        this.keyword = rs.rows.keyword;
        this.note = rs.rows.note;

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  onFileChanged(e: any) {
    this.file = <Array<File>>e.target.files;
    // this.file.
    // console.log(this.file);

    this.fileName = this.file[0].name;
    // const fileName = this.file[0].name;
  }

  async save() {
    if (!this.machineId) {
      const data = {
        machine_name_th: this.machineNameTH,
        machine_name_en: this.machineNameEN,
        serial: this.serial,
        model: this.model,
        year: this.year,
        cost_other: this.costOther,
        cost_other_currency: this.costOtherCurrency,
        cost: this.cost,
        price: this.price,
        keyword: this.keyword,
        note: this.note,
        qty: 0,
        status: 1
      };
      const rs: any = await this.machinesService.save(data);
      if (rs.ok) {
        const machineId = rs.rows[0];
        if (this.file) {
          await this.machinesService.uploadFile(machineId, this.file, this.fileName);
          this.alertService.success();
          this.router.navigate(['/admin/machines']);
        }
      } else {
        this.alertService.error(rs.error);
      }
    } else {
      const data = {
        machine_name_th: this.machineNameTH,
        machine_name_en: this.machineNameEN,
        serial: this.serial,
        model: this.model,
        year: this.year,
        cost_other: this.costOther,
        cost_other_currency: this.costOtherCurrency,
        cost: this.cost,
        price: this.price,
        keyword: this.keyword,
        note: this.note,
      };
      await this.machinesService.update(this.machineId, data);
      if (this.file) {
        await this.machinesService.uploadFile(this.machineId, this.file, this.fileName);
      }
      this.alertService.success();
      this.router.navigate(['/admin/machines']);
    }
  }


}
