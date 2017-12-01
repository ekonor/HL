import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ArenaViewComponent } from "app/arenas/arena-view/arena-view.component";
import { ArenaListComponent } from "app/arenas/arena-list/arena-list.component";
import { ArenasComponent } from "app/arenas/arenas.component";
import { ArenaFilterComponent } from "app/arenas/arena-filter/arena-filter.component";

import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaRoutingModule } from "app/arenas/arenas-routing.module";

@NgModule({
      declarations: [
        ArenasComponent,
        ArenaListComponent,
        ArenaViewComponent,
        ArenaFilterComponent
      ],
      imports: [
        BrowserModule, 
        FormsModule,
        CommonModule ,
        ArenaRoutingModule
      ],
      providers: [
        ArenaService
      ]
    })
    export class ArenaModule { }
    