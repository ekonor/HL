import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

import { TournamentsComponent } from 'app/tournaments/tournaments.component';
import { TournamentCreateComponent } from 'app/tournaments/tournament-create/tournament-create.component';

export const tournamentsRoutes: Routes = [
  { path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard] },
  { path: 'tournaments/create', component: TournamentCreateComponent, canActivate: [AuthGuard], data: { roles: ['TournamentAdministrator'] } }
 ];

  export const appRoutingProviders: any[] = [

  ];

  @NgModule({
    imports: [RouterModule.forRoot(tournamentsRoutes)],
    exports: [RouterModule],
  })
  export class TournamentsRoutingModule { }
