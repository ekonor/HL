import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TournamentsComponent } from 'app/tournaments/tournaments.component';
import { TournamentService } from 'app/tournaments/shared/tournament.service';
import { TournamentsRoutingModule } from 'app/tournaments/tournaments-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { TournamentCreateComponent } from 'app/tournaments/tournament-create/tournament-create.component';
import { PlayOffWgtComponent } from 'app/tournaments/playoff-wgt/playoff-wgt.component';

import { ArenaModule } from 'app/arenas/arenas.module';
import { OrganizationModule } from 'app/organizations/organizations.module';
import { TeamModule } from 'app/teams/teams.module';
import { RefereesModule } from 'app/referees/referees.module';
@NgModule({
      declarations: [
        TournamentsComponent,
        TournamentCreateComponent,
        PlayOffWgtComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        TournamentsRoutingModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule,
        MDBBootstrapModule,
        ArenaModule,
        TeamModule,
        OrganizationModule,
        RefereesModule
      ],
      exports: [
        // TAPicComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        TournamentService
      ]
    })
    export class TournamentsModule { }
