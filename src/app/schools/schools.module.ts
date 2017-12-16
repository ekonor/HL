import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from "app/shared/shared.module";
import { SchoolService } from "app/schools/shared/school.service";
import { SchoolRoutingModule } from "app/schools/schools.routing-module";
import { SchoolsComponent } from "app/schools/schools.component";
import { SchoolListComponent } from "app/schools/school-list/school-list.component";
import { SchoolFilterComponent } from "app/schools/school-filter/school-filter.component";


@NgModule({
      declarations: [
        SchoolsComponent,
        SchoolListComponent,
        SchoolFilterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        SharedModule,
        SchoolRoutingModule
      ],
      providers: [
        SchoolService
      ]
    })
    export class SchoolModule { }
