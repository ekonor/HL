import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';
import { NewsViewComponent } from 'app/news/news-view/news-view.component';
import { NewsComponent } from 'app/news/news.component';

export const newsRoutes: Routes =[
    { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'news/category/:id', component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'news/tag/:id', component: NewsComponent, canActivate: [AuthGuard]},
    { path: 'news/:id', component: NewsViewComponent, canActivate: [AuthGuard] },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(newsRoutes)],
    exports: [RouterModule],
  })
  export class NewsRoutingModule { }
