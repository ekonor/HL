import { Component, OnInit } from '@angular/core';

import { ListInfo } from "app/common/list/list-info";
import { ListResponse } from "app/common/list/list-response";

export abstract class ListBaseComponent<TListItem> implements OnInit {
  public title: string;

  public listData: Array<TListItem>;
  public listInfo: ListInfo;

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
      this.getListData()
          .then((result) => {
        this.listData = result.ListItems;

        // todo set pagerfrom result.Count
    });
  }

    protected abstract getListData() : Promise<ListResponse<TListItem>>;
}
