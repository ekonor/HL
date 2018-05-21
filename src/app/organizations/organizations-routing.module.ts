import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

/* import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { ArenasComponent } from 'app/arenas/arenas.component';
import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
import { ArenaLogoComponent } from 'app/arenas/arena-logo/arena-logo.component';
import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component'; */

export const organizationRoutes: Routes = [
  // { path: 'organizations', component: OrganizationsComponent, canActivate: [AuthGuard]},
  // { path: 'organization/:id', component: OrganizationViewComponent, canActivate: [AuthGuard]}
  /* { path: 'organizations/create', component: OrganizationCreateComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  { path: 'organization/edit/:id', component: OrganizationEditComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  { path: 'organization/logo/:id', component: OrganizationLogoComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} } */
];

export const appRoutingProviders: any[] = [
];

@NgModule({
  imports: [RouterModule.forRoot(organizationRoutes)],
  exports: [RouterModule],
})

export class OrganizationRoutingModule { }
