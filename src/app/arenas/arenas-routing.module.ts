import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { ArenasComponent } from 'app/arenas/arenas.component';
import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
import { ArenaLogoComponent } from 'app/arenas/arena-logo/arena-logo.component';
import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';

export const arenaRoutes: Routes =[
    { path: 'arenas', component: ArenasComponent },
    { path: 'arenas/create', component: ArenaCreateComponent },
    { path: 'arena/:id', component: ArenaViewComponent },
    { path: 'arena/edit/:id', component: ArenaEditComponent },
    { path: 'arena/logo/:id', component: ArenaLogoComponent }
  ];

  export const appRoutingProviders: any[] = [

  ];

  @NgModule({
    imports: [RouterModule.forRoot(arenaRoutes)],
    exports: [RouterModule],
  })
  export class ArenaRoutingModule { }

  // export const routingComponents = [FirstComponent, SecondComponent, ThirdComponent];
