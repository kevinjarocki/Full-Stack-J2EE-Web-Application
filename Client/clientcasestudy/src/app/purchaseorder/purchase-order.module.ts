import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // model driven forms
import { BrowserModule } from '@angular/platform-browser';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule
} from '@angular/material';
import {PurchaseOrderGeneratorComponent} from './purchase-order-generator.component';
@NgModule({
  declarations: [PurchaseOrderGeneratorComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule]
})
export class PurchaseOrderModule {

}
