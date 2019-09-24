import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule } from '@angular/material';
import { MatToolbarModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    VendorModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
