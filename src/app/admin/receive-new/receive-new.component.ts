import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AlertService } from 'src/app/alert.service';
@Component({
  selector: 'app-receive-new',
  templateUrl: './receive-new.component.html',
  styles: []
})
export class ReceiveNewComponent implements OnInit {

  products = [];

  selectProductId: any;
  selectProductNameTH: any;
  selectProductNameEN: any;

  selectSupplierId: any;
  selectSupplierName: any;

  qty: any;
  costEN: any;
  currency: any;
  cost: any;
  price: any;

  @ViewChild('searchProduct') public searchProduct: any;
  @ViewChild('searchLabeler') public searchLabeler: any;
  constructor(
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
  }

  selectProduct(e: any) {
    this.selectProductId = e.product_id;
    this.selectProductNameTH = e.product_name_th;
    this.selectProductNameEN = e.product_name_en;
  }

  selectLabeler(e: any) {
    this.selectSupplierId = e.supplier_id;
    this.selectSupplierName = e.supplier_name;

  }

  clearInput() {
    this.selectProductId = null;
    this.selectProductNameTH = null;
    this.selectProductNameEN = null;
    this.qty = null;
    this.costEN = null;
    this.currency = null;
    this.cost = null;
    this.price = null;
    this.searchProduct.clearProductSearch();
  }

  addProduct() {
    const obj = {
      product_id: this.selectProductId,
      product_name_th: this.selectProductNameTH,
      product_name_en: this.selectProductNameEN,
      qty: this.qty,
      cost_other: this.costEN,
      cost_other_currency: this.currency,
      cost: this.cost,
      price: this.price

    }
    this.products.push(obj);
    this.clearInput();
    console.log(this.products);

  }

  editQty(productId, value) {
    const idx: any = _.findIndex(this.products, { 'product_id': productId });
    if (idx > -1) {
      this.products[idx].qty = value;
    }
  }

  editCostEN(productId, value) {
    const idx: any = _.findIndex(this.products, { 'product_id': productId });
    if (idx > -1) {
      this.products[idx].cost_other = value;
    }
  }

  editCurrency(productId, value) {
    const idx: any = _.findIndex(this.products, { 'product_id': productId });
    if (idx > -1) {
      this.products[idx].cost_other_currency = value;
    }
  }

  editCost(productId, value) {
    const idx: any = _.findIndex(this.products, { 'product_id': productId });
    if (idx > -1) {
      this.products[idx].cost = value;
    }
  }

  editPrice(productId, value) {
    const idx: any = _.findIndex(this.products, { 'product_id': productId });
    if (idx > -1) {
      this.products[idx].price = value;
    }
  }

  removeProduct(productId) {
    this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?')
      .then((result) => {
        if (result.value) {
          const idx: any = _.findIndex(this.products, { 'product_id': productId });
          if (idx > -1) {
            this.products.splice(idx, 1);
          }
        }
      }).catch((err) => {
      });
  }

}
