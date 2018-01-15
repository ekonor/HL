import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
// import { NgxPermissionsModule } from 'ngx-permissions';

import { ArenaViewComponent } from "app/arenas/arena-view/arena-view.component";
import { ArenaEditComponent } from "app/arenas/arena-edit/arena-edit.component";
import { ArenaLogoComponent} from "app/arenas/arena-logo/arena-logo.component";
import { ArenaCreateComponent } from "app/arenas/arena-create/arena-create.component";
import { ArenaListComponent } from "app/arenas/arena-list/arena-list.component";
import { ArenasComponent } from "app/arenas/arenas.component";
import { ArenaFilterComponent } from "app/arenas/arena-filter/arena-filter.component";

import { ArenaService } from "app/arenas/shared/arena.service";
import { ArenaRoutingModule } from "app/arenas/arenas-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  // exports: [
  //   NgxPermissionsModule
  // ]
      declarations: [
        ArenasComponent,
        ArenaListComponent,
        ArenaViewComponent,
        ArenaEditComponent,
        ArenaCreateComponent,
        ArenaLogoComponent,
        ArenaFilterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        ArenaRoutingModule,
        NgxEditorModule
      ],
      providers: [
        ArenaService
      ]
    })
    export class ArenaModule { }
