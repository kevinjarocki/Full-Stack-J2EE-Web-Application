import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Form} from '@angular/forms';
import { RestfulService } from '../../restful.service';
import {Product} from '../../product/product';
import {PurchaseOrderLineItem} from '../purchase-order-line-item';
import {PurchaseOrder} from '../purchase-order';
import { BASEURL, PDFURL } from '../../constants';
import {Vendor} from '../../vendor/vendor';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './purchase-order-generator.component.html'
})
export class PurchaseOrderGeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;

  qty: FormControl;
  // component
  products: Array<Product>;
  vendors: Array<Vendor>;
  items: Array<PurchaseOrderLineItem>;
  selectedproducts: Array<Product>;
  vendorproducts: Array<Product>;
  selectedProduct: Product;
  selectedVendor: Vendor;
  selectedQty: number;
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  total: number;
  sub: number;
  tax: number;
  purchaseorderno: number;
  url: string;
  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.pickedQty = false;
    this.generated = false;
    this.url = BASEURL + 'purchaseorders';
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.qty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      qty: this.qty
    });
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQty();
    this.msg = 'Loading vendors from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      vendorPayload => {
        this.vendors = vendorPayload._embedded.vendors;
        this.msg = 'Vendors loaded.';
        this.msg = 'Loading products from server...';
        this.restService.load(BASEURL + 'products').subscribe(
          productPayload => {
            this.products = productPayload._embedded.products;
            this.msg = 'Server data loaded.';
          },
          err => {this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
          });
      },
      err => {
        this.msg += ` Error occurred - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  } // ngOnInit

  ngOnDestroy() : void {

  }

  onPickVendor(): void {
    this.generatorForm.get('vendorid').valueChanges.subscribe(val => {
      this.selectedProduct = null;
      this.selectedVendor = val;
      this.loadVendorProducts();
      this.pickedProduct = false;
      this.pickedQty = false;
      this.hasProducts = false;
      this.msg = 'Choose product for vendor';
      this.pickedVendor = true;
      this.generated = false;
      this.items = [];
      this.selectedproducts = [];
      if (this.items.length < 0){
        this.msg = 'No Products Selected';
      }

    });
  } // onPickVendor

  onPickProduct(): void {
    this.generatorForm.get('productid').valueChanges.subscribe(val => {
      this.selectedProduct = val;
      this.pickedQty = false;
      if (this.selectedProduct != null) {
        this.pickedProduct = true;
        this.generatorForm.get('qty').valueChanges.subscribe(val => {
          this.selectedQty = val;
          if (this.selectedQty != null && this.selectedQty != 0) {
            const item: PurchaseOrderLineItem = {
              id: 0, poid: 0, qty: this.selectedQty, price: this.selectedProduct.costprice, productid: this.selectedProduct.id, tax: null, subtotal: null, extended: null
            };
            if (this.items.find(it => it.productid === this.selectedProduct.id)){
              this.items.find(it => it.productid === this.selectedProduct.id).qty = this.selectedQty;
              this.items.find(it => it.productid === this.selectedProduct.id).extended= this.selectedQty * this.selectedProduct.costprice;
              // ignore entry
              this.msg = item.qty + " " + this.selectedProduct.name + '(s) Added';
            } else {
              this.items.push(item);
              this.selectedproducts.push(this.selectedProduct);
            } // Add item to items array
            if (this.items.length > 0) {
              this.pickedProduct = true;
              this.hasProducts = true;
            }
            this.items.forEach(exp => exp.extended = exp.price * exp.qty);
            this.sub = 0.0;
            this.tax = 0.0;
            this.total = 0.0;
            this.items.forEach(exp => this.sub += Number(exp.extended));
            this.tax = this.sub * 0.13;
            this.total = this.sub + this.tax;

          }
        })
      }
    });
  } // onPickProduct
  onPickQty(): void {
    this.generatorForm.get('qty').valueChanges.subscribe(val => {
      if (val != 0) {
        this.selectedQty = val; // Set max qty by default
        this.pickedQty = true;
        this.msg = val + " " + this.selectedProduct.name + '(s) Added';
      }
      if ( this.selectedQty == 0 && this.items.find(it => it.productid === this.selectedProduct.id)) {
        // remove from items
        this.items = this.items.filter(it => it.productid != this.selectedProduct.id);
        // remove from selected products
        this.selectedproducts = this.selectedproducts.filter(it => it.id != this.selectedProduct.id);
        this.msg = this.selectedProduct.name + ' Removed!';
      }

    });
  }
  /**
   * loadVendorProducts - filter for a particular vendor's products
   */
  loadVendorProducts() {
    this.vendorproducts = [];
    this.vendorproducts = this.products.filter(ex => ex.vendorid === this.selectedVendor.id); // filter products for single vendor
    this.vendorproducts = this.products.filter(ex => ex.vendorid === this.selectedVendor.id); // filter products for single vendor
  } // loadVendorProducts

  /**
   * createProductOrder - create the client side purchaseorder
   */
  createPurchaseOrder() {
    this.generated = false;
    const purchaseorder: PurchaseOrder = {id: 0, items: this.items, vendorid: this.selectedVendor.id, amount: this.total};
    this.restService.add(this.url, purchaseorder).subscribe(
      purchaseorderId => {
        if (purchaseorderId > 0) { // server returns new purchaseorder#
          this.msg = `Purchase Order #${purchaseorderId} created!`;
          this.generated = true;
          this.purchaseorderno = purchaseorderId;
        } else {
          this.msg = 'Purchase Order not created! - server error';
        }
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.pickedQty = false;
      },
      err => {
        this.msg = `Error occurred - Purchase Order not created - ${err.status} - ${err.statusText}`;
      }
    );
  } // createProductOrder
  /**
   * viewPdf - determine purchaseorder number and pass to server
   * for PDF generation in a new window
   */
  viewPdf() {
    window.open(PDFURL + this.purchaseorderno, '');
  } // viewPdf

}
