import { Component, Input, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { ApiConfig } from "app/core/api-config";
import { UserInfo } from "app/shared/user-info";

@Component({
    selector: "user-pic",
    templateUrl: "user-pic.component.html"
})

@Injectable()
export class UserPicComponent {
    @Input() user: UserInfo;

    constructor(
        private readonly router: Router,
        private readonly apiConfig: ApiConfig) {
    }

    public openProfile(): void {
        this.router.navigate(['profile', this.user.id]);
    }

    public getLogo(): string {
        let logoSrc = this.apiConfig.filesPath;
        let placeholder = "assets/img/users/no-logo.png";
        return this.user.logo ? logoSrc + this.user.logo: placeholder;
    }
}