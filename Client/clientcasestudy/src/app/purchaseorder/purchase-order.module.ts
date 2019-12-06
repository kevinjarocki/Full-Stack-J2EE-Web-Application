import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // model driven forms
import { BrowserModule } from '@angular/platform-browser';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule
} from '@angular/material';
import {PurchaseOrderGeneratorComponent} from './generator/purchase-order-generator.component';
import {PurchaseOrderViewerComponent} from './viewer/purchase-order-viewer.component';

@NgModule({
  declarations: [PurchaseOrderGeneratorComponent, PurchaseOrderViewerComponent],
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
