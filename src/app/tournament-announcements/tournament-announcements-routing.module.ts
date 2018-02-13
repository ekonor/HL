import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';

// import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { TournamentAnnouncementComponent } from 'app/tournament-announcements/tournament-announcements.component';
// import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
// import { ArenaLogoComponent } from 'app/arenas/arena-logo/arena-logo.component';
// import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';

export const tournamentAnnouncementsRoutes: Routes =[
  { path: 'tournament-announcements', component: TournamentAnnouncementComponent, canActivate: [AuthGuard]},
  // { path: 'arena/:id', component: ArenaViewComponent, canActivate: [AuthGuard]},
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
