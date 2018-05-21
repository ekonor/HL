import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TournamentAnnouncementViewComponent} from 'app/tournament-announcements/ta-view/tournament-announcement-view.component';
import { TournamentAnnouncementListComponent } from 'app/tournament-announcements/ta-list/tournament-announcement-list.component';
import { TournamentAnnouncementsComponent } from 'app/tournament-announcements/tournament-announcements.component';
import { TournamentAnnouncementFilterComponent } from 'app/tournament-announcements/ta-filter/ta-filter/ta-filter.component';
import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { TournamentAnnouncementsRoutingModule } from 'app/tournament-announcements/tournament-announcements-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { TAAdminComponent} from 'app/tournament-announcements/ta-admin/ta-admin.component';
import { TAAdminListComponent } from 'app/tournament-announcements/ta-admin/ta-admin-list/ta-admin-list.component';
import { TAAdminFilterComponent } from 'app/tournament-announcements/ta-filter/ta-admin-filter/ta-admin-filter.component';
import { TACreateComponent } from 'app/tournament-announcements/ta-create/ta-create.component';
import { TAEditComponent } from 'app/tournament-announcements/ta-edit/ta-edit.component';
import { TALogoComponent } from 'app/tournament-announcements/ta-logo/ta-logo.component';

import { ArenaModule } from 'app/arenas/arenas.module';
import { OrganizationModule } from 'app/organizations/organizations.module';
@NgModule({
      declarations: [
        TournamentAnnouncementsComponent,
        TournamentAnnouncementListComponent,
        TournamentAnnouncementFilterComponent,
        TAAdminFilterComponent,
        TournamentAnnouncementViewComponent,
        TAAdminComponent,
        TAAdminListComponent,
        TACreateComponent,
        TAEditComponent,
        TALogoComponent
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
        CoreModule,
        MDBBootstrapModule,
        ArenaModule,
        OrganizationModule
      ],
      providers: [
        TournamentAnnouncementsService
        // TAOrganizatorService
      ]
    })
    export class TournamentAnnouncementsModule { }
