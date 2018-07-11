import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ListInfo } from 'app/shared/list/list-info';
import { ListResponse } from 'app/shared/list/list-response';



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
          .subscribe((result) => {

        this.listData = result.listItems;

        // todo set pagerfrom result.Count
    }
   );
  }

    protected abstract getListData() : Observable<ListResponse<TListItem>>;
}
