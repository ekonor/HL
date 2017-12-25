import { Component, Input } from "@angular/core";
import { ReplyService } from "app/news/replies/shared/reply.service";
import { Reply } from "app/news/replies/shared/reply";


@Component({
    selector: 'reply-list-item',
    inputs: ['content'],
    templateUrl: './reply-list-item.component.html'
})
export class ReplyListItemComponent {
    @Input() reply: Reply;

    constructor(private readonly replyService: ReplyService) {

    }

    public addReply(parentReplyId: number) {

    }

    public addComplain(replyId: number) {

    }

    public addVoteUp() {

    }

    public addVoteDown() {

    }

    isUserAuthorized(): boolean {
        return true; // todo check
    }
}