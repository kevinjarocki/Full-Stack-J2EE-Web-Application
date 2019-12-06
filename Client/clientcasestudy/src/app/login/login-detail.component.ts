import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html'
})
export class LoginDetailComponent implements OnInit {
  @Output() getuser = new EventEmitter();
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  user: User;
  constructor(private builder: FormBuilder) {
    this.username = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl('', Validators.compose([Validators.required]));
  } // constructor
  ngOnInit() {
    this.loginForm = this.builder.group({
      username: 'kevinjarocki',
      password: ''
    });
  } // ngOnInit
  loaduserfields() {
    this.user = {username: this.loginForm.value.username,
      password: this.loginForm.value.password};
    this.getuser.emit(this.user);
  }
} // LoginDetailComponent
