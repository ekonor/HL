import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { NewsService } from 'app/news/shared/news.service';
import { Router } from '@angular/router';
import { Category } from 'app/news/shared/category';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {
  categoryList: Category[];
  dataIsLoading: boolean;

  constructor(
    private readonly newsService: NewsService,
    private router: Router) {
  }

  ngOnInit() {
    this.getListData();
  }

  public viewCategoryNews(category: Category) {
    this.router.navigate(['news/category', category.id]);
  }

  private getListData() {
    this.dataIsLoading = true;

    this.newsService.getNewsCategories().subscribe(
      data => this.categoryList = data,
      error => { },
      () => this.dataIsLoading = false);
  }
}
