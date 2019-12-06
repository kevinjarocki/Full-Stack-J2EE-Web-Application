import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RestfulService } from '../../restful.service';
import { BASEURL, PDFURL } from '../../constants';
import {Subscription} from 'rxjs';
import {PurchaseOrderLineItem} from '../purchase-order-line-item';
import {PurchaseOrder} from '../purchase-order';
import {Vendor} from '../../vendor/vendor';
import {Product} from '../../product/product';

@Component({
  templateUrl: './purchase-order-viewer.component.html'
})
export class PurchaseOrderViewerComponent implements OnInit, OnDestroy{
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  purchaseorderid: FormControl;
  qty: FormControl;
  private subscription: Subscription;
  // component
  products: Array<Product>; // everybody's products
  purchaseorders: Array<PurchaseOrder>;
  vendors: Array<Vendor>; // all vendors
  items: Array<PurchaseOrderLineItem>; // product items that will be in report
  selectedpurchaseorders: Array<PurchaseOrder>;
  vendorpurchaseorders: Array<PurchaseOrder>;

  selectedPurchaseOrder: PurchaseOrder;
  tempProduct: Product;
  selectedProduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected vendor
  tax: number;
  sub: number
  pickedPurchaseOrder: boolean;
  pickedVendor: boolean;
  generated: boolean;
  hasProducts: boolean;
  hasPurchaseOrder: boolean;
  msg: string;
  total: number;
  purchaseorderno: number;
  url: string;
  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.pickedVendor = false;
    this.pickedPurchaseOrder = false;
    this.generated = false;
    this.url = BASEURL + 'api/purchaseorders';
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.vendorid = new FormControl('');
    this.purchaseorderid = new FormControl('');
    this.generatorForm = this.builder.group({
      purchaseorderid: this.purchaseorderid,
      vendorid: this.vendorid,
      productid: this.productid
    });
    this.onPickVendor();
    this.onPickPurchaseOrder();

    this.msg = 'loading vendors from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      vendorPayload => {
        this.vendors = vendorPayload._embedded.vendors;
        this.msg = 'vendors loaded';
        this.msg = 'loading purchaseorders from server...';
        this.restService.load(BASEURL + 'purchaseorders').subscribe(
          purchaseorderPayload => {
            this.purchaseorders = purchaseorderPayload._embedded.purchaseorders;
          },
          err => {this.msg += `Error occurred - purchaseorders not loaded - ${err.status} - ${err.statusText}`;
          });
        this.restService.load(BASEURL + 'products').subscribe(
          productPayload => {
            this.products = productPayload._embedded.products;
            this.msg = 'product data loaded';
          },
          err => {this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;}
        );
      },
      err => {this.msg += ` Error occurred - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  } // ngOnInit

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  viewPdf() {
    window.open(PDFURL + this.purchaseorderno, '');
  } // viewPdf

  onPickVendor() : void {
    this.subscription = this.generatorForm.get('vendorid').valueChanges.subscribe(val => {
      this.selectedPurchaseOrder = null;
      this.selectedVendor = val;
      this.loadVendorPurchaseOrders();
      this.pickedPurchaseOrder = false;
      this.hasPurchaseOrder = false;
      this.msg = 'choose purchaseorder for vendor';
      this.pickedVendor = true;
      this.generated = false;
      this.items = [];
      this.selectedpurchaseorders = [];
      this.hasProducts = false;
      this.purchaseorderno = null;
    });


  }
  onPickPurchaseOrder(): void {
    const xsubscr = this.generatorForm.get('purchaseorderid').valueChanges.subscribe(val => {
      this.hasPurchaseOrder = true;
      this.msg = this.selectedVendor.name + "'s purchaseorders loaded!";
      this.items = [];
      this.purchaseorderno = null;

      this.selectedPurchaseOrder = val;
      this.purchaseorderno = this.selectedPurchaseOrder.id;

      for (let i=0; i < this.selectedPurchaseOrder.items.length; i++) {

        const item: { productid: string; id: number; poid: number } = {id: 0, poid: 0, productid: this.selectedPurchaseOrder.items[i].productid};
         this.items = this.selectedPurchaseOrder.items;

        console.log(this.selectedPurchaseOrder.items[i]);

        if (this.items.find(it => it.productid === item.productid)) { // ignore entry
        } else { // add entry
          this.items.push(<PurchaseOrderLineItem> item);
          this.tempProduct = this.products.find(ex => item.productid === ex.id);

        }

        this.total = 0.0;
        //this.selectedproducts.forEach(exp => this.total += exp.);
      }

      if (this.items.length > 0) {
        this.hasProducts = true;
      }
    });

    this.subscription.add(xsubscr); // add it as a child, so all can be destroyed together
  }

  /**
   * loadVendorProducts - filter for a particular vendor's products
   */
  loadVendorPurchaseOrders() {
    this.vendorpurchaseorders = [];
    this.vendorpurchaseorders = this.purchaseorders.filter(ex => ex.vendorid === this.selectedVendor.id); // filter products for single vendor
  } // loadVendorProducts


}
