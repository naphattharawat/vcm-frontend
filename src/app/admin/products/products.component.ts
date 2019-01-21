import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  totalProducts: any;
  perPage = 10;
  query = '';
  constructor(
    private productService: ProductsService,
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
        rs = await this.productService.search(this.query, limit, offset);
      } else {
        rs = await this.productService.all(limit, offset);
      }
      // this.modalLoading.hide();
      if (rs.ok) {
        this.products = rs.rows;
        for (const p of this.products) {
          if (p.picture != null && p.picture != '') {
            p.picture = this.url + '/' + p.picture;
          } else {
            p.picture = null;
          }
        }
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

  async delete(productId) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.productService.delete(productId);
          const idx = _.findIndex(this.products, { 'product_id': productId });
          if (idx > -1) {
            this.products.splice(idx, 1);
          }
        }
      });
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
