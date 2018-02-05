import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { Ng2Permission } from 'angular2-permission';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { AuthGuard } from "app/core/auth/auth.guard";
import { AuthenticationService } from "app/core/auth/authentication.service";
import { UserService } from "app/core/auth/user.service";
import { CityComponent } from "app/core/geo/city.component";
import { CityService } from "app/core/geo/city.service";

@NgModule({
      declarations: [
        CityComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        Ng2Permission,
        NgbModule,
        AgmCoreModule
      ],
      exports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        Ng2Permission,
        NgbModule,
        AgmCoreModule,
        CityComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        CityService
      ]
    })
    export class CoreModule { }
