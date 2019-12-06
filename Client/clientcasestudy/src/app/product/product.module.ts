import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home.component';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule, MatTableModule,
  MatSortModule, MatExpansionModule, MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailComponent } from './product-detail.component';



@NgModule({
  declarations: [ProductHomeComponent, ProductDetailComponent],
  imports: [
    CommonModule, MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
    MatIconModule, MatCardModule, MatTooltipModule, MatListModule, MatTableModule,
    MatSortModule, ReactiveFormsModule, BrowserModule, MatExpansionModule, MatPaginatorModule
  ]
})
export class ProductModule { }
