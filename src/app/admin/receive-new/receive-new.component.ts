import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-receive-new',
  templateUrl: './receive-new.component.html',
  styles: []
})
export class ReceiveNewComponent implements OnInit {

  products = [];
  selectProductId:any;
  selectProductNameTH:any;
  selectProductNameEN:any;
  @ViewChild('searchProduct') public searchProduct: any;
  constructor() { }

  ngOnInit() {
  }

  selectProduct(e:any){
    this.selectProductId = e.product_id;
    this.selectProductNameTH = e.product_name_th;
    this.selectProductNameEN = e.product_name_en;
  }

  addProduct(){
    const obj ={
      product_id:this.selectProductId,
      product_name_th:this.selectProductNameTH,
      product_name_en:this.selectProductNameEN
    }
    this.products.push(obj);
  }
}
