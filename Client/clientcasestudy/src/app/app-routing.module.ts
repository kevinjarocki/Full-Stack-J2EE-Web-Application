import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import {ProductHomeComponent} from './product/product-home.component';
import {PurchaseOrderGeneratorComponent} from './purchaseorder/purchase-order-generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vendors', component: VendorHomeComponent },
  { path: '', component: HomeComponent},
  {path: 'products', component: ProductHomeComponent},
  {path: 'generator', component: PurchaseOrderGeneratorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
