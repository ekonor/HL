import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListBaseComponent } from 'app/shared/list/list-base.component';
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem } from 'app/news/shared/news';
import { Router } from '@angular/router';

@Component({
  selector: 'news-list',
  inputs: ['content'],
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {
  content: NewsListItem[];

  constructor(
    private readonly router: Router,
    private readonly newsService: NewsService) {
  }

  ngOnInit(): void {
  }

  public getNewsPostLogo(newsItem: NewsListItem): string {
    return this.newsService.getNewsLogo(newsItem);
  }

  public viewNewsItem(post: NewsListItem) {
    this.router.navigate(['news', post.id]);
  }

  public viewNewsItemComments(post: NewsListItem) {
    this.router.navigate(['news', post.id]);
  }

  public viewNewsCategory(post: NewsListItem){
    this.router.navigate(['news/category', post.categoryId]);
  }
}
