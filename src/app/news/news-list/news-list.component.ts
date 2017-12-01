import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListBaseComponent } from 'app/shared/list/list-base.component';
import { NewsService } from 'app/news/shared/news.service';
import { NewsListResponse, NewsListItem } from 'app/news/shared/news';

@Component({
  selector: 'news-list',
  inputs: ['content'],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit{
  content: NewsListItem[];
  
  constructor() {
    
  }

  ngOnInit(): void {
  }
}
