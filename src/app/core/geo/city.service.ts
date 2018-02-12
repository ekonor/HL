import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { City } from 'app/core/geo/city';
import { Country} from 'app/core/geo/country';
import { ApiConfig } from 'app/core/api-config';


@Injectable()
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private readonly apiConfig: ApiConfig) {
  }

  public getCities(searchTerm: string, countryId: number): Observable<City[]> {
    if (searchTerm === '') {
      return of([]);
    }
    const methodUrlPrefix = '/geo/cities';
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    params = params.append('searchTerm', searchTerm);
    if (countryId) {
      params = params.append('countryId', countryId.toString());
    }
    return this.httpClient.get<City[]>(methodUrl, { params: params });
  }

  public getCountries(searchTerm: string): Observable<City[]> {
    if (searchTerm === '') {
      return of([]);
    }
    const methodUrlPrefix = '/geo/countries';
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = new HttpParams();
    params = params.append('searchTerm', searchTerm);
    return this.httpClient.get<Country[]>(methodUrl, { params: params });
  }

  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }
}
