import { AlertService } from './../../alert.service';
import { Component, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  totalProducts: any;
  perPage = 20;
  query = '';
  constructor(
    private productService: ProductsService,
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
        rs = await this.productService.search(this.query, limit, offset);
      } else {
        rs = await this.productService.all(limit, offset);
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.products = rs.rows;
        this.totalProducts = rs.total;
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
        const rs: any = await this.productService.search(this.query, this.perPage, 0);
        if (rs.ok) {
          this.products = rs.rows;
          this.totalProducts = rs.total;
        } else {
          this.alertService.error(rs.error);
        }
      } catch (error) {
        this.alertService.error(error);
      }

    }
  }
}
