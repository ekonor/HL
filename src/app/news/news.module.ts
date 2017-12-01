import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

// import { NewsViewComponent } from "app/news/news-view/news-view.component";
import { NewsListComponent } from "app/news/news-list/news-list.component";
import { NewsComponent } from "app/news/news.component";
// import { NewsFilterComponent } from "app/news/news-filter/news-filter.component";

import { NewsService } from "app/news/shared/news.service";
import { NewsRoutingModule } from "app/news/news-routing.module";

@NgModule({
      declarations: [
        NewsComponent,
        NewsListComponent,
        // NewsViewComponent,
        // NewsFilterComponent
      ],
      imports: [
        BrowserModule, 
        FormsModule,
        CommonModule ,
        NewsRoutingModule
      ],
      providers: [
        NewsService
      ]
    })
    export class NewsModule { }
    