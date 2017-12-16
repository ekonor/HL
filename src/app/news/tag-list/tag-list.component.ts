import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { NewsService } from "app/news/shared/news.service";
import { Tag } from "app/news/shared/tag";

@Component({
    selector: 'tag-list',
    templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit {
    @Input() postId: number;
    tags: Tag[];

    constructor(
        private readonly newsService: NewsService,
        private readonly router: Router) {
    }

    get noTags():boolean{
        return !this.tags || this.tags.length == 0;
    }

    ngOnInit() {
        this.getPostTags();
    }

    public viewTagNews(tag: Tag) {
        this.router.navigate(['news/tag', tag.id]);
    }

    private getPostTags() {
        this.newsService.getTags(this.postId)
            .subscribe(data => this.tags = data)
    }
}