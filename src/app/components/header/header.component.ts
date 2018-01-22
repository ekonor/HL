import { Component, OnInit } from '@angular/core';
//import {RouterModule, RouterLink,  } from "@angular/router";
//import {routing} from "../../app.routes";

import { AuthenticationService} from 'app/core/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = 'Аноним';

  constructor(private authenticationService: AuthenticationService) {
    const login = this.authenticationService.getUserName();
    if (login) {
      this.username = login;
    }
  }

  ngOnInit() {
    const login = this.authenticationService.getUserName();
    if (login) {
      this.username = login;
    }
  }

  refresh() {
    const login = this.authenticationService.getUserName();
    if (login) {
      this.username = login;
    }
    else {
      this.username = 'Аноним';
    }
  }

}
