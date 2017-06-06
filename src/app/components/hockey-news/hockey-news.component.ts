import { Component, OnInit } from '@angular/core';
import { Post } from './news';
import { NewsService } from './news.service';
@Component({
  selector: 'app-hockey-news',
  templateUrl: './hockey-news.component.html',
  styleUrls: ['./hockey-news.component.scss'],
  providers: [NewsService]
})
export class HockeyNewsComponent implements OnInit {
  title = 'Новости хоккейного мира';
  constructor(private _newsService: NewsService) {}


  getNews() {
      this._newsService.getNews().then(news => this.news = news);
  }

  ngOnInit() {
    this.getNews();
  }
  news: Post [];
}
