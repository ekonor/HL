import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { PermissionService } from 'angular2-permission';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private permissionService: PermissionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
    const roles = route.data['roles'] as Array<string>;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            console.log(currentUser.roles);
            const myRoles = currentUser.roles; // current roles for user
            let isFound = false;
            for (let i = 0; i < myRoles.length; i++) {
                if (roles) {
                  if (roles.indexOf(myRoles[i]) !== -1) {
                    isFound = true; // someone role
                  }
                }
                this.permissionService.add(myRoles[i]);
            }
            console.log(this.permissionService.store);
            if (!roles) { return true; }
            console.log("isFound "+isFound);
            return isFound;
            // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            //  return false;
            }
    if (!roles) { return true; } // access for any user
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
