import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { PaginationService } from 'app/shared/pagination.service';

@Component({
  selector: 'pagination',
  inputs: ['page', 'collectionSize', 'pageSize'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  page:number;
  collectionSize: number;
  pageSize: number;

  constructor(private readonly paginationService: PaginationService) {

  }

  public setPage(page: number){
    console.log("page="+page);
    this.paginationService.setPage(page);
  }
}
