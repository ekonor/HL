import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// import { TournamentAnnouncementViewComponent} from 'app/tournament-announcements/ta-view/tournament-announcement-view.component';
// import { TournamentAnnouncementListComponent } from 'app/tournament-announcements/ta-list/tournament-announcement-list.component';
import { TournamentsComponent } from 'app/tournaments/tournaments.component';
// import { TournamentAnnouncementFilterComponent } from 'app/tournament-announcements/ta-filter/ta-filter/ta-filter.component';
import { TournamentService } from 'app/tournaments/shared/tournament.service';
import { TournamentsRoutingModule } from 'app/tournaments/tournaments-routing.module';
import { SharedModule } from 'app/shared/shared.module';

// import { TAAdminComponent} from 'app/tournament-announcements/ta-admin/ta-admin.component';
// import { TAAdminListComponent } from 'app/tournament-announcements/ta-admin/ta-admin-list/ta-admin-list.component';
// import { TAAdminFilterComponent } from 'app/tournament-announcements/ta-filter/ta-admin-filter/ta-admin-filter.component';
import { TournamentCreateComponent } from 'app/tournaments/tournament-create/tournament-create.component';
// import { TAEditComponent } from 'app/tournament-announcements/ta-edit/ta-edit.component';
// import { TALogoComponent } from 'app/tournament-announcements/ta-logo/ta-logo.component';
// import { TAPicComponent } from 'app/tournament-announcements/ta-pic/ta-pic.component';

import { ArenaModule } from 'app/arenas/arenas.module';
import { OrganizationModule } from 'app/organizations/organizations.module';
import { TeamModule } from 'app/teams/teams.module';
import { RefereesModule } from 'app/referees/referees.module';
@NgModule({
      declarations: [
        TournamentsComponent,
        /*TournamentAnnouncementListComponent,
        TournamentAnnouncementFilterComponent,
        TAAdminFilterComponent,
        TournamentAnnouncementViewComponent,
        TAAdminComponent,
        TAAdminListComponent,*/
        TournamentCreateComponent,
       /* TAEditComponent,
        TALogoComponent,
        TAPicComponent*/
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
