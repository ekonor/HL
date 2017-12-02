import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { PaginationComponent } from "app/shared/pagination/pagination.component";
import { PaginationService } from "app/shared/pagination.service";

@NgModule({
      declarations: [
        PaginationComponent
      ],
      imports: [
        BrowserModule, 
        FormsModule,
        CommonModule
      ],
      exports: [
        CommonModule, 
        FormsModule, 
        PaginationComponent
      ],
      providers: [
        PaginationService
      ]
    })
    export class SharedModule { }
    