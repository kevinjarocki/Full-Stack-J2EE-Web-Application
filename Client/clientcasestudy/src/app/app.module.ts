import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatMenuModule, MatOptionModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
import {ProductModule} from './product/product.module';
import {PurchaseOrderModule} from './purchaseorder/purchase-order.module';
import {LoginModule} from './login/login.module';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    VendorModule,
    ProductModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,
    PurchaseOrderModule,
    LoginModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
