import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { VendorListComponent} from './vendor/vendor-list.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';

@NgModule({
  declarations: [
    VendorHomeComponent, VendorListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule
  ],
  bootstrap: [VendorHomeComponent]
})
export class AppModule {}
