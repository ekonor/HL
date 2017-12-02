import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ListInfo } from 'app/shared/list/list-info';

@Injectable()
export class PaginationService {
  constructor(private http: Http) {}

  
}
