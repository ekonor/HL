import { UserInfo } from "app/shared/user-info";

export class Reply {
    id: number;

    user: UserInfo;

    creationDate: Date;
    body: string;

    voteUpCount: number;
    voteDownCount: number;

    get votes(): number {
        return this.voteUpCount + this.voteDownCount;
    }

    replies?: Reply[];
}