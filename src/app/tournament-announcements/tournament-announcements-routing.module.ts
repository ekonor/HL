import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

import { TournamentAnnouncementViewComponent } from 'app/tournament-announcements/ta-view/tournament-announcement-view.component';
import { TournamentAnnouncementsComponent } from 'app/tournament-announcements/tournament-announcements.component';
import { ProfileOrganizatorComponent } from 'app/tournament-announcements/profile-organizator/profile-organizator.component';
import { TACreateComponent } from 'app/tournament-announcements/ta-create/ta-create.component';
// import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
// import { ArenaLogoComponent } from 'app/arenas/arena-logo/arena-logo.component';
// import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';

export const tournamentAnnouncementsRoutes: Routes = [
  { path: 'tournament-announcements', component: TournamentAnnouncementsComponent, canActivate: [AuthGuard]},
  { path: 'tournament-announcement/:id', component: TournamentAnnouncementViewComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileOrganizatorComponent, canActivate: [AuthGuard]},
  { path: 'tournament-announcements/create', component: TACreateComponent, canActivate: [AuthGuard]}
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
