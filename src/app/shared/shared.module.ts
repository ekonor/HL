import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaginationComponent } from "app/shared/pagination/pagination.component";
import { PaginationService } from "app/shared/pagination.service";
import { MapComponent } from "app/shared/map/map.component";
import { SortingComponent } from "app/shared/sorting/sorting.component";
import { UserPicComponent } from "app/shared/user-pic/user-pic.component";
import { SimpleFilterComponent } from "app/shared/simple-filter/simple-filter.component";
import { LoaderComponent } from "app/shared/loader/loader.component";
import { LoaderEmptyComponent } from "app/shared/loader/loader-empty.component";

// import { NgbDateNativeAdapter, DatepickerComponent } from 'app/shared/datepicker/datepicker.component';
import { DatepickerComponent } from 'app/shared/datepicker/datepicker.component';

import { ComboboxComponent } from 'app/shared/combobox/combobox.component';


@NgModule({
      declarations: [
        PaginationComponent,
        MapComponent,
        SortingComponent,
        UserPicComponent,
        SimpleFilterComponent,
        LoaderComponent,
        LoaderEmptyComponent,
        DatepickerComponent,
        ComboboxComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        NgbModule,
        AgmCoreModule,
        MDBBootstrapModule
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
        SimpleFilterComponent,
        LoaderComponent,
        LoaderEmptyComponent,
        DatepickerComponent,
        ComboboxComponent
      ],
      providers: [
        PaginationService
        // NgbDateNativeAdapter
      ]
    })
    export class SharedModule { }
