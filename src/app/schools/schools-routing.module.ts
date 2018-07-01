import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

import { SchoolViewComponent } from 'app/schools/school-view/school-view.component';
import { SchoolsComponent } from 'app/schools/schools.component';
import { SchoolEditComponent } from 'app/schools/school-edit/school-edit.component';
import { SchoolLogoComponent } from 'app/schools/school-logo/school-logo.component';
import { SchoolCreateComponent } from 'app/schools/school-create/school-create.component';

export const schoolRoutes: Routes = [
  { path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard]},
  { path: 'school/:id', component: SchoolViewComponent, canActivate: [AuthGuard]},
  { path: 'schools/create', component: SchoolCreateComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  { path: 'school/edit/:id', component: SchoolEditComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  { path: 'school/logo/:id', component: SchoolLogoComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} }
];

  export const appRoutingProviders: any[] = [

  ];

  @NgModule({
    imports: [RouterModule.forRoot(schoolRoutes)],
    exports: [RouterModule],
  })
  export class SchoolRoutingModule { }
