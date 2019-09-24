import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// added imports
import {MatButtonModule, MatCardModule, MatMenuModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorHomeComponent } from './vendor-home.component';
import { VendorListComponent} from './vendor-list.component';
import { VendorDetailComponent } from './vendor-detail.component';
@NgModule({
  declarations: [
    VendorHomeComponent, VendorListComponent, VendorDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class VendorModule { }
