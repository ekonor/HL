import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ListInfo } from 'app/shared/list/list-info';

@Injectable()
export class PaginationService {
  private _pageSize: number = 9;

  get pageSize(): number{
    return this._pageSize; // todo from localstorage
  }

  set pageSize(value: number) {
    this._pageSize = value; // todo store in localStorage
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {}

  public setPage(page: number) {
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams["page"] = page;
    this.router.navigate([], { queryParams: queryParams});
  }
}
