import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Vendor} from './vendor';
import { ValidatePhone } from '../validators/phone.validator';
import {ValidatePostalCode} from '../validators/postalcode.validator';
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html'
})

export class VendorDetailComponent implements OnInit {
  @Input() selectedVendor: Vendor;
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();

  vendorForm: FormGroup;
  name: FormControl;
  address1: FormControl;
  city: FormControl;
  province: FormControl;
  postalcode: FormControl;
  phone: FormControl;
  type: FormControl;
  email: FormControl;
  originalName: string;

  constructor(private builder: FormBuilder) {
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.address1 = new FormControl('', Validators.compose([Validators.required]));
    this.city = new FormControl('', Validators.compose([Validators.required]));
    this.province = new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]));
    this.postalcode = new FormControl('', Validators.compose([Validators.required, ValidatePostalCode]));
    this.phone = new FormControl('', Validators.compose([Validators.required, ValidatePhone]));
    this.type = new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]));
  } // constructor

  ngOnInit() {
    this.vendorForm = this.builder.group({
      name: this.name,
      address1: this.address1,
      city: this.city,
      province: this.province,
      postalcode: this.postalcode,
      phone: this.phone,
      type: this.type,
      email: this.email
    });

    // patchValue doesn’t care if all values present
    this.vendorForm.patchValue({
      name: this.selectedVendor.name,
      address1: this.selectedVendor.address1,
      city: this.selectedVendor.city,
      province: this.selectedVendor.province,
      postalcode: this.selectedVendor.postalcode,
      phone: this.selectedVendor.phone,
      type: this.selectedVendor.type,
      email: this.selectedVendor.email
    });
  } // ngOnInit

  updateSelectedVendor() {
    this.selectedVendor.name = this.vendorForm.value.name;
    this.selectedVendor.address1 = this.vendorForm.value.address1;
    this.selectedVendor.city = this.vendorForm.value.city;
    this.selectedVendor.province = this.vendorForm.value.province;
    this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
    this.selectedVendor.phone = this.vendorForm.value.phone;
    this.selectedVendor.type = this.vendorForm.value.type;
    this.selectedVendor.email = this.vendorForm.value.email;
    this.saved.emit(this.selectedVendor);
  }

} // VendorDetailComponent






