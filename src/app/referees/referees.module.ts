import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RefereeService } from 'app/referees/shared/referee.service';
import { SharedModule } from 'app/shared/shared.module';
import { RefereeSelectComponent } from 'app/referees/referee-select/referee-select.component';
import { RefereeMultiselectComponent } from 'app/referees/referee-multiselect/referee-multiselect.component';

@NgModule({
      declarations: [
        RefereeSelectComponent,
        RefereeMultiselectComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule,
        MDBBootstrapModule
      ],
      exports: [
        RefereeSelectComponent,
        RefereeMultiselectComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        RefereeService
      ]
    })
    export class RefereesModule { }
