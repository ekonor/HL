import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';

import { SchoolViewComponent } from 'app/schools/school-view/school-view.component';
import { SchoolEditComponent } from 'app/schools/school-edit/school-edit.component';
import { SchoolLogoComponent} from 'app/schools/school-logo/school-logo.component';
import { SchoolCreateComponent } from 'app/schools/school-create/school-create.component';
import { SchoolListComponent } from 'app/schools/school-list/school-list.component';
import { SchoolsComponent } from 'app/schools/schools.component';
import { SchoolFilterComponent } from 'app/schools/school-filter/school-filter.component';

import { SchoolService } from 'app/schools/shared/school.service';
import { SchoolRoutingModule } from 'app/schools/schools-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SchoolSelectComponent } from 'app/schools/school-select/school-select.component';
import { SchoolPicComponent } from 'app/schools/school-pic/school-pic.component';

import { ArenaModule } from 'app/arenas/arenas.module';

@NgModule({
      declarations: [
        SchoolsComponent,
        SchoolListComponent,
        SchoolViewComponent,
        SchoolEditComponent,
        SchoolCreateComponent,
        SchoolLogoComponent,
        SchoolFilterComponent,
        SchoolSelectComponent,
        SchoolPicComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        SchoolRoutingModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule,
        ArenaModule
      ],
      exports: [
        SchoolFilterComponent,
        SchoolSelectComponent,
        SchoolPicComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        SchoolService
      ]
    })
    export class SchoolModule { }
