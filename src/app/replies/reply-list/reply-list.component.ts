import { Component, Input } from "@angular/core";
import { Reply } from "app/replies/shared/reply";

@Component({
    selector: 'reply-list',
    inputs: ['content'],
    templateUrl: './reply-list.component.html'
})
export class ReplyListComponent {
    @Input() content: Reply[];

    public addReply(parentReplyId: number) {

    }

    public addComplain(replyId: number) {

    }

    public addVoteUp(){

    }

    public addVoteDown(){
        
    }
}