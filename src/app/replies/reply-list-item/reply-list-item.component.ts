import { Component, Input } from "@angular/core";
import { Reply } from "app/replies/shared/reply";

@Component({
    selector: 'reply-list-item',
    inputs: ['content'],
    templateUrl: './reply-list-item.component.html'
})
export class ReplyListItemComponent {
    @Input() reply: Reply;

    public addReply(parentReplyId: number) {

    }

    public addComplain(replyId: number) {

    }

    public addVoteUp(){

    }

    public addVoteDown(){
        
    }

    isUserAuthorized(): boolean {
        return true; // todo check
    }
}