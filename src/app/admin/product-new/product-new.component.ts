import { AlertService } from './../../alert.service';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  file: Array<File>;
  fileName: any;

  productNameTH: any;
  productNameEN: any;
  model: any;
  serial: any;
  unit: any;
  costOther: any;
  costOtherCurrency: any;
  cost: any;
  price: any;
  keyword: any;
  note: any;
  productId;
  title = 'เพิ่มสินค้า';
  constructor(
    private productsService: ProductsService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
        this.productId = params.productId;
      });
  }

  ngOnInit() {
    if (this.productId) {
      this.title = 'แก้ไขสินค้า';
      this.getInfo();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.productsService.info(this.productId);
      if (rs.ok) {
        this.productNameEN = rs.rows.product_name_en;
        this.productNameTH = rs.rows.product_name_th;
        this.serial = rs.rows.serial;
        this.model = rs.rows.model;
        this.unit = rs.rows.unit;
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
    if (!this.productId) {
      const data = {
        product_name_th: this.productNameTH,
        product_name_en: this.productNameEN,
        serial: this.serial,
        model: this.model,
        unit: this.unit,
        cost_other: this.costOther,
        cost_other_currency: this.costOtherCurrency,
        cost: this.cost,
        price: this.price,
        keyword: this.keyword,
        note: this.note,
        qty: 0,
        status: 1
      };
      const rs: any = await this.productsService.save(data);
      if (rs.ok) {
        const productId = rs.rows[0];
        if (this.file) {
          await this.productsService.uploadFile(productId, this.file, this.fileName);
          this.alertService.success();
          this.router.navigate(['/admin/products']);
        }
      } else {
        this.alertService.error(rs.error);
      }
    } else {
      const data = {
        product_name_th: this.productNameTH,
        product_name_en: this.productNameEN,
        serial: this.serial,
        model: this.model,
        unit: this.unit,
        cost_other: this.costOther,
        cost_other_currency: this.costOtherCurrency,
        cost: this.cost,
        price: this.price,
        keyword: this.keyword,
        note: this.note,
      };
      await this.productsService.update(this.productId, data);
      if (this.file) {
        await this.productsService.uploadFile(this.productId, this.file, this.fileName);
      }
      this.alertService.success();
      this.router.navigate(['/admin/products']);
    }
  }


}
