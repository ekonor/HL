import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { ArenasComponent } from 'app/arenas/arenas.component';

export const arenaRoutes: Routes =[
    { path: 'arenas/:id', component: ArenaViewComponent },
    { path: 'arenas', component: ArenasComponent }
  ];
  
  export const appRoutingProviders: any[] = [
  
  ];

  @NgModule({
    imports: [RouterModule.forRoot(arenaRoutes)],
    exports: [RouterModule],
  })
  export class ArenaRoutingModule { }
  
  // export const routingComponents = [FirstComponent, SecondComponent, ThirdComponent];