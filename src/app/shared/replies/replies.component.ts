import { Injectable, OnInit, Input, Component } from "@angular/core";
import { Reply } from "app/shared/replies/shared/reply";
import { ReplyService } from "app/shared/replies/shared/reply.service";


@Component({
    selector: 'replies',
    templateUrl: './replies.component.html'
})

@Injectable()
export class RepliesComponent implements OnInit {
    @Input() postId: number;

    replies: Reply[];

    constructor(private readonly replyService: ReplyService) {
    }

    ngOnInit() {
        this.getReplies(this.postId);
    }

    private getReplies(postId: number) {
        this.replyService.getRepliesList(postId).subscribe(data => this.replies = data);
    }
}
