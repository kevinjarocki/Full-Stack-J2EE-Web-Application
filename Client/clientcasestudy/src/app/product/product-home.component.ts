import {Component, OnInit, ViewChild} from '@angular/core';
import { Vendor} from '../vendor/vendor';
import {Product} from '../product/product';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-product',
  templateUrl: 'product-home.component.html'
})
export class ProductHomeComponent implements OnInit {
  products: Product[];
  vendors: Array<Vendor>;
  selectedProduct: Product;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  emptyVendor: Vendor;
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'products';
    this.emptyVendor = {id: null, name: '', address1: '', city: '', province: '', email: '', phone: '', type: '', postalcode: ''};
  } // constructor

  ngOnInit() {
    this.msg = 'loading vendors from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      venPayload => {
        this.vendors = venPayload._embedded.vendors;
        this.msg = 'vendors loaded';
        this.msg = 'loading products from server...';
        this.restService.load(this.url).subscribe(
          proPayload => {
            this.products = proPayload._embedded.products;
            this.msg = 'products loaded';
            this.dataSource = new MatTableDataSource(this.products);
            this.dataSource.sort = this.sort;
          },
          err => {this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
          }); },
      err => {this.msg += `Error occurred - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  }
  select(product: Product) {
    this.todo = 'update';
    this.selectedProduct = product;
    this.msg = `Product ${product.id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string) {
    this.restService.load(this.url).subscribe(
      payload => {
        this.products = payload._embedded.products;
        this.msg = 'Operation Cancelled!';
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort;
      },
      err => {this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
      });
    this.hideEditForm = !this.hideEditForm;
  } // cancel

  /**
   * update - send changed update to service update local array
   */
  update(product: Product) {
    this.msg = 'Updating...';
    this.restService.update(this.url + '/' + product.id, product).subscribe( payload => {
        if (payload.id !== '') {
// update local array using ? operator
          this.products = this.products.map(exp => exp.id === product.id ? ({...exp, payload}) : exp);
          this.msg = `Product ${product.id} updated!`;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
        } else {
          this.msg = 'Product not updated! - Server problem';
        }
      },
      err => {
        this.msg = `Error - product not updated - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // update
  /**
   * save - determine whether we're doing and add or an update
   */
  save(product: Product) {
    this.products.find(p => p.id === product.id ) ? this.update(product) : this.add(product);
  } // save

  /**
   * add - send product to service, receive newid back
   */
  add(product: Product) {
    this.msg = 'Adding...';
   // product.id = '';
    this.restService.add(this.url, product).subscribe(
      payload => {
        // tslint:disable-next-line:triple-equals
        if (payload.id !== '') { // server returns new id
          this.products = [...this.products, product]; // add product to current array using spread
        //  product.id = payload.id;
          this.msg = `Product ${product.id} added!`;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
        } else {
          this.msg = 'Product not added! - server error';
        }
      },
      err => {
        this.msg = `Error - product not added - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // add
  /**
   * newProduct - create new product instance
   */
  newProduct() {
    this.selectedProduct = { id: null, vendorid: null, name: '',
      costprice: null, msrp: null, rop: null, eoq: null, qoh: null, qoo: null };
    this.msg = 'New product';
    this.hideEditForm = !this.hideEditForm;
  } // newProduct
  /**
   * delete - send product id to service for deletion and remove from local collection
   */
  delete(product: Product) {
    this.msg = 'Deleting...';
    this.restService.load(`${this.url}/search/deleteOne?productid=${product.id}`).subscribe(
      payload => {
        if (payload === 1) { // server returns # rows deleted
          this.msg = `Product ${product.id} deleted!`;
          this.products = this.products.filter(exp => exp.id !== product.id);
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
        } else {
          this.msg = 'Product not deleted! - server error';
        }
      },
      err => {
        this.msg = `Error - products not deleted - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // delete

} // ProductHomeComponent
