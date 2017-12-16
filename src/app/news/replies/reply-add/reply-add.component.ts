import { Component, Input } from "@angular/core";

@Component({
    selector: 'reply-add',
    templateUrl: './reply-add.component.html'
})
export class ReplyAddComponent {

    isUserAuthorized(): boolean {
        return true; // todo check
    }
}