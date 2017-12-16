import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

import { SchoolsComponent } from 'app/schools/schools.component';


export const schoolRoutes: Routes =[
   { path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard] },
//   { path: 'school/:id', component: SchoolViewComponent },
//   { path: 'school/create', component: SchoolCreateComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
//   { path: 'school/edit/:id', component: SchoolEditComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
];

  @NgModule({
    imports: [RouterModule.forRoot(schoolRoutes)],
    exports: [RouterModule],
  })
  export class SchoolRoutingModule { }