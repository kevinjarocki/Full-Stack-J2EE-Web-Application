import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import {ProductHomeComponent} from './product/product-home.component';
import {PurchaseOrderGeneratorComponent} from './purchaseorder/generator/purchase-order-generator.component';
import { AuthGuard } from './login/auth-guard.service';
import { LoginHomeComponent } from './login/login-home.component';
import {PurchaseOrderViewerComponent} from './purchaseorder/viewer/purchase-order-viewer.component';

const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'vendors', component: VendorHomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductHomeComponent, canActivate: [AuthGuard]},
  {path: 'viewer', component: PurchaseOrderViewerComponent, canActivate: [AuthGuard]},
  {path: 'generator', component: PurchaseOrderGeneratorComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
