import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { ArenasComponent } from 'app/arenas/arenas.component';
import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';

export const arenaRoutes: Routes =[
    { path: 'arenas', component: ArenasComponent },
    { path: 'arenas/create', component: ArenaCreateComponent },
    { path: 'arena/:id', component: ArenaViewComponent },
    { path: 'arenas/edit/:id', component: ArenaEditComponent },
  ];

  export const appRoutingProviders: any[] = [

  ];

  @NgModule({
    imports: [RouterModule.forRoot(arenaRoutes)],
    exports: [RouterModule],
  })
  export class ArenaRoutingModule { }

  // export const routingComponents = [FirstComponent, SecondComponent, ThirdComponent];
