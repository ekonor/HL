import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';

import { TeamFilterComponent } from 'app/teams/team-filter/team-filter.component';

import { TeamService } from 'app/teams/shared/team.service';
import { SharedModule } from 'app/shared/shared.module';
import { TeamSelectComponent } from 'app/teams/team-select/team-select.component';
import {PlayerSetComponent } from 'app/teams/player-set/player-set.component';

@NgModule({
      declarations: [
        TeamFilterComponent,
        TeamSelectComponent,
        PlayerSetComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule
      ],
      exports: [
        TeamFilterComponent,
        TeamSelectComponent,
        PlayerSetComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        TeamService
      ]
    })
    export class TeamModule { }
