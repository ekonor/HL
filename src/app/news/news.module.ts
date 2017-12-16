import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { NewsListComponent } from "app/news/news-list/news-list.component";
import { NewsComponent } from "app/news/news.component";
import { NewsService } from "app/news/shared/news.service";
import { NewsRoutingModule } from "app/news/news-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { NewsViewComponent } from "app/news/news-view/news-view.component";
import { NewsImportantComponent } from "app/news/news-important/news-important.component";
import { NewsResentComponent } from "app/news/news-resent/news-resent.component";
import { CategoryListComponent } from "app/news/category-list/category-list.component";
import { ReplyService } from "app/news/replies/shared/reply.service";
import { ReplyListItemComponent } from "app/news/replies/reply-list-item/reply-list-item.component";
import { ReplyAddComponent } from "app/news/replies/reply-add/reply-add.component";
import { RepliesComponent } from "app/news/replies/replies.component";
import { TagListComponent } from "app/news/tag-list/tag-list.component";


@NgModule({
      declarations: [
        NewsComponent,
        NewsListComponent,
        NewsViewComponent,
        NewsImportantComponent,
        NewsResentComponent,
        CategoryListComponent,
        RepliesComponent,
        ReplyAddComponent,
        ReplyListItemComponent,
        TagListComponent
      ],
      imports: [
        BrowserModule, 
        FormsModule,
        CommonModule,
        SharedModule,
        NewsRoutingModule
      ],
      providers: [
        NewsService,
        ReplyService
      ]
    })
    export class NewsModule { }
    