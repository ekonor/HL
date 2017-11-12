import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class loginForm {
  data: Object = {};
  constructor(private _router: Router) {}
  formSubmit() {
    let uname = this.data.username;
    let pass = this.data.password;
    let key = btoa(btoa(uname) + '??' + btoa(pass));
    console.log(this.data);
    console.log(key);
    if( uname == "admin" && pass == "admin")
    this._router.navigate(['AdminArea']);
  }
}
