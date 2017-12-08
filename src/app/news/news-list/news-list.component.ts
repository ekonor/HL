import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListBaseComponent } from 'app/shared/list/list-base.component';
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem } from 'app/news/shared/news';
import { Router } from '@angular/router';

@Component({
  selector: 'news-list',
  inputs: ['content'],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  content: NewsListItem[];

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  public viewNewsItem(post: NewsListItem) {
    debugger;
    this.router.navigate(['news', post.id]);
  }
}
