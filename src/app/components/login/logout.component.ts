import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'app/auth/index';

@Component({
  moduleId: module.id,
  template: ''
})

export class LogoutComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService ) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([this.returnUrl]);
    //this.returnUrl = '/';
  }
}


