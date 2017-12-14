import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsViewComponent } from 'app/news/news-view/news-view.component';
import { NewsComponent } from 'app/news/news.component';

export const newsRoutes: Routes =[
    { path: 'news', component: NewsComponent },
    { path: 'news/category/:id', component: NewsComponent },
    { path: 'news/tag/:id', component: NewsComponent },
    { path: 'news/:id', component: NewsViewComponent },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(newsRoutes)],
    exports: [RouterModule],
  })
  export class NewsRoutingModule { }