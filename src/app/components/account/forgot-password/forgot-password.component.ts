import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "app/auth/authentication.service";
import { AlertService } from "app/components/alert/alert.service";

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  sendcode() {
    this.loading = true;
    throw new Error('not implemented');

    // this.authenticationService.login(this.model.username, this.model.password)
    //     .subscribe(
    //         data => {
    //             this.router.navigate(['forgot-password-confirmation']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
}
}




