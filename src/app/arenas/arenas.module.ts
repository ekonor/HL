import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';

import { ArenaViewComponent } from 'app/arenas/arena-view/arena-view.component';
import { ArenaEditComponent } from 'app/arenas/arena-edit/arena-edit.component';
import { ArenaLogoComponent} from 'app/arenas/arena-logo/arena-logo.component';
import { ArenaCreateComponent } from 'app/arenas/arena-create/arena-create.component';
import { ArenaCreateFastComponent } from 'app/arenas/arena-create-fast/arena-create-fast.component';
import { ArenaListComponent } from 'app/arenas/arena-list/arena-list.component';
import { ArenasComponent } from 'app/arenas/arenas.component';
import { ArenaFilterComponent } from 'app/arenas/arena-filter/arena-filter.component';

import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaRoutingModule } from 'app/arenas/arenas-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ArenaSelectComponent } from 'app/arenas/arena-select/arena-select.component';
import { ArenaPicComponent } from 'app/arenas/arena-pic/arena-pic.component';

@NgModule({
      declarations: [
        ArenasComponent,
        ArenaListComponent,
        ArenaViewComponent,
        ArenaEditComponent,
        ArenaCreateComponent,
        ArenaCreateFastComponent,
        ArenaLogoComponent,
        ArenaFilterComponent,
        ArenaSelectComponent,
        ArenaPicComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        ArenaRoutingModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule
      ],
      exports: [
        ArenaFilterComponent,
        ArenaSelectComponent,
        ArenaPicComponent,
        ArenaCreateFastComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        ArenaService
      ]
    })
    export class ArenaModule { }
