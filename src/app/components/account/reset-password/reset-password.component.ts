import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resetpassword(){
    throw new Error('not implemented');
  }
}
