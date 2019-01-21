import { AlertService } from 'src/app/alert.service';
import { ReceiveService } from './../../receive.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receive-detail',
  templateUrl: './receive-detail.component.html',
  styles: []
})
export class ReceiveDetailComponent implements OnInit {

  @Input() receiveId: any;
  products = [];
  constructor(
    private receiveService: ReceiveService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getProductList(this.receiveId);
  }

  async getProductList(receiveId) {
    // this.loading = true;
    try {
      const result: any = await this.receiveService.getReceiveProducts(receiveId);
      // this.loading = false;
      if (result.ok) {
        this.products = result.rows;
      } else {
        console.log(result.error);
        this.alertService.error();
      }
    } catch (error) {
      // this.loading = false;
      this.alertService.error(error.message);
    }
  }

}
