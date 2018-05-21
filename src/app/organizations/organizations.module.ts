import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'app/core/core.module';

import { OrganizationService } from 'app/organizations/shared/organization.service';
import { OrganizationRoutingModule } from 'app/organizations/organizations-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationPicComponent } from 'app/organizations/organization-pic/organization-pic.component';

@NgModule({
      declarations: [
        OrganizationPicComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        OrganizationRoutingModule,
        NgxEditorModule,
        Ng2Permission,
        NgbModule,
        CoreModule
      ],
      exports: [
        OrganizationPicComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
       OrganizationService
      ]
    })
    export class OrganizationModule { }
