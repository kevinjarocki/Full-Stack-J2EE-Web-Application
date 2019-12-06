import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// added imports
import { MatButtonModule, MatCardModule, MatMenuModule, MatInputModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatListModule,
  MatDialogModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginHomeComponent } from './login-home.component';
import { LoginDetailComponent } from './login-detail.component';
@NgModule({
  declarations: [ LoginHomeComponent, LoginDetailComponent ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
