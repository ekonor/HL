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

  posts: Post[]=[];


  constructor(private _newsService: NewsService) {}

    ngOnInit(){
    this._newsService.getNewsList().subscribe((ListItems)=>this.posts=ListItems)





  }
}
