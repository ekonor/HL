import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import {CoreModule} from 'app/core/core.module';

// import { ArenaViewComponent } from "app/arenas/arena-view/arena-view.component";
// import { ArenaEditComponent } from "app/arenas/arena-edit/arena-edit.component";
// import { ArenaLogoComponent} from "app/arenas/arena-logo/arena-logo.component";
// import { ArenaCreateComponent } from "app/arenas/arena-create/arena-create.component";
import { TournamentAnnouncementListComponent } from 'app/tournament-announcements/tournament-announcement-list/tournament-announcement-list.component';
import { TournamentAnnouncementComponent } from 'app/tournament-announcements/tournament-announcements.component';
import { TournamentAnnouncementFilterComponent } from 'app/tournament-announcements/tournament-announcement-filter/tournament-announcement-filter.component';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementsRoutingModule } from 'app/tournament-announcements/tournament-announcements-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
      declarations: [
        TournamentAnnouncementComponent,
        TournamentAnnouncementListComponent,
        // ArenaViewComponent,
        // ArenaEditComponent,
        // ArenaCreateComponent,
        // ArenaLogoComponent,
        TournamentAnnouncementFilterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        TournamentAnnouncementsRoutingModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule
      ],
      providers: [
        TournamentAnnouncementsService
      ]
    })
    export class TournamentAnnouncementsModule { }
