import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
    const roles = route.data['roles'] as Array<string>;
    if (!roles) { return true; } // access for any user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      console.log(currentUser.roles);
      const myRoles = currentUser.roles; // current roles for user
      for (let i = 0; i < myRoles.length; i++){
        if (roles.indexOf(myRoles[i]) !== -1) {
          return true; // someone role
        }
      }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
