import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ListInfo } from 'app/shared/list/list-info';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PaginationService {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {}

  public setPage(page: number, pageSize: number) {
    let path = this.router.url.match(new RegExp("[^?]+"))[0];
    let currentPagams = {};

    this.router.navigate([path], { queryParams: {page: page}});
  }

  public setPageSize(page: number, pageSize: number) {
    // todo
  }
}
