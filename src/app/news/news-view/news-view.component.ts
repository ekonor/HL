import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListBaseComponent } from 'app/shared/list/list-base.component';
import { NewsService } from 'app/news/shared/news.service';
import { NewsListItem, NewsItem } from 'app/news/shared/news';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'news-view',
    inputs: ['content'],
    templateUrl: './news-view.component.html'
})
export class NewsViewComponent implements OnInit {
    newsItem: NewsItem;
    id: number;
    dataIsLoading: boolean;

    private sub: any;

    constructor(
        private readonly newsService: NewsService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = parseInt(params['id']);
            this.getNewsPost(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getNewsPostLogo(): string {
        return this.newsService.getNewsLogo(this.newsItem);
    }

    private getNewsPost(id: number) {
        this.dataIsLoading = true;
        this.newsService.getNewsItem(id).subscribe(
            data => this.newsItem = data,
            error => { },
            () => this.dataIsLoading = false);
    }
}
