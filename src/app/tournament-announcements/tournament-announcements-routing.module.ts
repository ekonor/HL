import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

import { TournamentAnnouncementViewComponent } from 'app/tournament-announcements/ta-view/tournament-announcement-view.component';
import { TournamentAnnouncementsComponent } from 'app/tournament-announcements/tournament-announcements.component';
import { TAAdminComponent } from 'app/tournament-announcements/ta-admin/ta-admin.component';
import { TACreateComponent } from 'app/tournament-announcements/ta-create/ta-create.component';
import { TAEditComponent } from 'app/tournament-announcements/ta-edit/ta-edit.component';
// import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
// import { ArenaLogoComponent } from 'app/arenas/arena-logo/arena-logo.component';
// import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';

export const tournamentAnnouncementsRoutes: Routes = [
  { path: 'tournament-announcements', component: TournamentAnnouncementsComponent, canActivate: [AuthGuard]},
  { path: 'tournament-announcement/:id', component: TournamentAnnouncementViewComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: TAAdminComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator', 'TournamentAdministrator', 'TournamentModerator']}},
  { path: 'tournament-announcements/create', component: TACreateComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator', 'TournamentAdministrator']}},
  { path: 'tournament-announcements/edit/:id', component: TAEditComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator', 'TournamentAdministrator']}}

  // tournament-announcements/edit
  // { path: 'arenas/create', component: ArenaCreateComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  // { path: 'arena/edit/:id', component: ArenaEditComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} },
  // { path: 'arena/logo/:id', component: ArenaLogoComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrator']} }
];

  export const appRoutingProviders: any[] = [

  ];

  @NgModule({
    imports: [RouterModule.forRoot(tournamentAnnouncementsRoutes)],
    exports: [RouterModule],
  })
  export class TournamentAnnouncementsRoutingModule { }
