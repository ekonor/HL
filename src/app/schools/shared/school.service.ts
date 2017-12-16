import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SchoolListItem } from "app/schools/shared/school";
import { Observable } from "rxjs/Observable";
import { SchoolFilter } from "app/schools/shared/school-filter";
import { ListInfo } from "app/shared/list/list-info";
import { ListResponse } from "app/shared/list/list-response";
import { ApiConfig } from "app/core/api-config";

@Injectable()
export class SchoolService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiConfig: ApiConfig) {
    }

    public getSchools(filter: SchoolFilter, listInfo: ListInfo): Observable<ListResponse<SchoolListItem>> {
        const methodUrlPrefix = '/schools/list';

        let methodUrl = this.getMethodUrl(methodUrlPrefix);
        let params = listInfo.toParams();

        if (filter.cityId)
            params = params.append('cityId', filter.cityId.toString());
        if (filter.searchText)
            params = params.append('searchText', filter.searchText);

        return this.httpClient.get<ListResponse<SchoolListItem>>(methodUrl, { params: params });
    }

    public getSchoolLogo(school: SchoolListItem): string {
        let logoSrc = this.apiConfig.filesPath;
        let placeholder = "assets/img/schools/no_logo.png";
        return school.logo ? logoSrc + school.logo : placeholder;
    }

    private getMethodUrl(methodUrlPrefix: string): string {
        return this.apiConfig.apiPath + methodUrlPrefix;
    }
}