import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product} from './product';
import {Vendor} from '../vendor/vendor';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product;
  @Input() vendors: Vendor[];
  @Input() products: Product[];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  id: FormControl;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  constructor(private builder: FormBuilder) {
    this.id = new FormControl('', Validators.compose([this.uniqueCodeValidator.bind(this), Validators.required]));
    this.vendorid = new FormControl('', Validators.compose([Validators.required]));
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl('', Validators.compose([Validators.required]));
    this.msrp = new FormControl('', Validators.compose([Validators.required]));
    this.rop = new FormControl('', Validators.compose([Validators.required]));
    this.eoq = new FormControl('', Validators.compose([Validators.required]));
    this.qoh = new FormControl('', Validators.compose([Validators.required]));
    this.qoo = new FormControl('', Validators.compose([Validators.required]));
  } // constructor

  ngOnInit() {
    this.productForm = this.builder.group({
      id: this.id,
      vendorid: this.vendorid,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo
    }); // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo
    });
  } // ngOnInit
  updateSelectedProduct() {
    this.selectedProduct.id = this.productForm.get('id').value;
    this.selectedProduct.vendorid = this.productForm.get('vendorid').value;
    this.selectedProduct.name = this.productForm.get('name').value;
    this.selectedProduct.costprice = this.productForm.get('costprice').value;
    this.selectedProduct.msrp = this.productForm.get('msrp').value;
    this.selectedProduct.rop = this.productForm.get('rop').value;
    this.selectedProduct.eoq = this.productForm.get('eoq').value;
    this.selectedProduct.qoh = this.productForm.get('qoh').value;
    this.selectedProduct.qoo = this.productForm.get('qoo').value;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedProduct
  uniqueCodeValidator(control) {
    /**
     * uniqueCodeValidator - needed access to products property so not
     * with the rest of the validators
     */
    if (this.products) {
      return this.products.find(p => p.id === control.value && !this.selectedProduct.id) ? {idExists: true} : null;
    } // uniqueCodeValidator
  }
} // ProductDetailComponent
