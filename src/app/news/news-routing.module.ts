import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { NewsViewComponent } from 'app/news/news-view/news-view.component';
import { NewsComponent } from 'app/news/news.component';

export const newsRoutes: Routes =[
    // { path: 'news/:id', component: NewsViewComponent },
    { path: 'news', component: NewsComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(newsRoutes)],
    exports: [RouterModule],
  })
  export class NewsRoutingModule { }