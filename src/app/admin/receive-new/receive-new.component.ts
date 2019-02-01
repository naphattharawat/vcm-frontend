import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AlertService } from 'src/app/alert.service';
import { ReceiveService } from '../receive.service';
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
    private receiveService: ReceiveService
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
    const idx = _.findIndex(this.products, { 'product_id': this.selectProductId });
    if (idx > -1) {
      this.alertService.error('รายการซ้ำ กรุณาแก้รายการเดิม');
    } else {
      const obj = {
        product_id: this.selectProductId,
        product_name_th: this.selectProductNameTH,
        product_name_en: this.selectProductNameEN,
        qty: this.qty || 0,
        cost_other: this.costEN || 0,
        cost_other_currency: this.currency || '',
        cost: this.cost || 0,
        price: this.price || 0
      };
      this.products.push(obj);
      this.clearInput();
    }
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

  enter(e: any) {
    if (e.keyCode === 13 && (this.qty && this.qty > 0)) {
      this.addProduct();
    }
  }

  async save() {
    try {
      const head = {
        supplier_id: this.selectLabeler
      };
      await this.receiveService.save(head, this.products);
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
