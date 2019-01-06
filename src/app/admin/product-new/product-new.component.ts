import { AlertService } from './../../alert.service';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    private productsService: ProductsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onFileChanged(e: any) {
    this.file = <Array<File>>e.target.files;
    // this.file.
    // console.log(this.file);

    this.fileName = this.file[0].name;
    // const fileName = this.file[0].name;
  }

  async save() {
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
        console.log(this.file);

        await this.productsService.uploadFile(productId, this.file, this.fileName);
      }

    } else {
      this.alertService.error(rs.error);
    }
  }


}
