import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ApiConfig } from "app/core/api-config";
import { Observable } from "rxjs/Observable";
import { Reply } from "app/shared/replies/shared/reply";

@Injectable()
export class ReplyService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiConfig: ApiConfig) {
    }

    public getRepliesList(postId: number): Observable<Reply[]> {
        let methodUrl = this.getMethodUrl(postId, '/list');
        return this.httpClient.get<Reply[]>(methodUrl);
    }

    public addReply(postId: number) {
        let methodUrl = this.getMethodUrl(postId);
    }

    public addVoteUp(replyId: number): Observable<any> {
        let methodUrl = this.getMethodUrl(replyId, 'vote-up');
        return this.httpClient.post(methodUrl, {});
    }

    public addVoteDown(replyId: number): Observable<any> {
        let methodUrl = this.getMethodUrl(replyId, 'vote-down');
        return this.httpClient.post(methodUrl, {});
    }

    private getMethodUrl(id: number, methodUrlPrefix?: string): string {
        let baseServiceApiUrl = this.apiConfig.apiPath + `replies/${id}`;
        return baseServiceApiUrl + (methodUrlPrefix || '');
    }
}