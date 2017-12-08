import { Component, Input } from "@angular/core";
import { Reply } from "app/replies/shared/reply";

@Component({
    selector: 'reply-add',
    templateUrl: './reply-add.component.html'
})
export class ReplyAddComponent {

    isUserAuthorized(): boolean {
        return true; // todo check
    }
}