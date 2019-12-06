import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
@Component({
  template: `
<mat-toolbar class="my-primary-text"></mat-toolbar>
<mat-card>
    <mat-card-header layout="row">
        <mat-card-title style="margin-bottom: 4vh;">
            <div style="text-align:center; font-size: xx-large" class="my-primary-text">
                    L<img width="25" height="25" src="assets/img/icon.png"/>GIN
            </div>
        </mat-card-title>
    </mat-card-header>
<mat-card-content>
<app-login-detail (getuser)="login($event)"></app-login-detail>
    <mat-card-header class="pad-left-xl pad-bottom-lg mat-title text-center my-accent-text" >{{msg}}</mat-card-header>
</mat-card-content>
</mat-card>
`
})
export class LoginHomeComponent implements OnInit {
  model: any = {};
  user: User;
  msg: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public restService: RestfulService
  ) { }
  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.msg = 'enter login credentials';
  }
  login(user: User) {
    const url = `${BASEURL}login`;
    sessionStorage.setItem('token', user.username + ':' + user.password);
    this.restService.add(url, user)
      .subscribe(payload => {
          if (payload) { // server returns true if headers pass authentication
            this.router.navigate(['home']);
          } else {
            this.msg = 'Authentication failed.';
            sessionStorage.removeItem('token');
          }
        },
        err => {
          this.msg = 'Authentication failed.';
          sessionStorage.removeItem('token');
        });
  }
}
