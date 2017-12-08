import { Component, Input } from "@angular/core";
import { Reply } from "app/shared/replies/shared/reply";
import { ReplyService } from "app/shared/replies/shared/reply.service";


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