import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { PaginationService } from 'app/shared/pagination.service';

@Component({
  selector: 'pagination',
  inputs: ['page', 'collectionSize', 'pageSize'],
  templateUrl: './pagination.component.html',
//   styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor(private readonly newsService: PaginationService) {

  }
}
