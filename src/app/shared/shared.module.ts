import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { PaginationComponent } from "app/shared/pagination/pagination.component";
import { PaginationService } from "app/shared/pagination.service";
import { MapComponent } from "app/shared/map/map.component";
import { SortingComponent } from "app/shared/sorting/sorting.component";
import { UserPicComponent } from "app/shared/user-pic/user-pic.component";
import { RepliesComponent } from "app/shared/replies/replies.component";
import { ReplyAddComponent } from "app/shared/replies/reply-add/reply-add.component";
import { ReplyListItemComponent } from "app/shared/replies/reply-list-item/reply-list-item.component";
import { ReplyService } from "app/shared/replies/shared/reply.service";


@NgModule({
      declarations: [
        PaginationComponent,
        MapComponent,
        SortingComponent,
        UserPicComponent,
        RepliesComponent,
        ReplyAddComponent,
        ReplyListItemComponent
      ],
      imports: [
        BrowserModule, 
        FormsModule,
        CommonModule,
        NgbModule,
        AgmCoreModule
      ],
      exports: [
        CommonModule, 
        FormsModule,
        NgbModule, 
        AgmCoreModule,
        PaginationComponent,
        MapComponent,
        SortingComponent,
        UserPicComponent,
        RepliesComponent
      ],
      providers: [
        PaginationService,
        ReplyService
      ]
    })
    export class SharedModule { }
    