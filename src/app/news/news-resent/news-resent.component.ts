import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem } from 'app/news/shared/news';
import { Router } from '@angular/router';

@Component({
  selector: 'news-resent',
  templateUrl: './news-resent.component.html'
})
export class NewsResentComponent {
  newsList: NewsListItem[];
  dataIsLoading: boolean;

  constructor(
    private readonly newsService: NewsService,
    private router: Router) {
  }

  ngOnInit() {
    this.getListData();
  }

  public viewNewsItem(post: NewsListItem) {
    this.router.navigate(['news', post.id]);
  }

  private getListData() {
    this.dataIsLoading = true;
    this.newsService.getResentNewsList().subscribe(
      data => this.newsList = data,
      error => { },
      () => this.dataIsLoading = false);
  }
}
