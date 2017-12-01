import { NgModule } from "@angular/core";

import { AuthGuard } from "app/core/auth/auth.guard";
import { AuthenticationService } from "app/core/auth/authentication.service";
import { UserService } from "app/core/auth/user.service";

@NgModule({
      declarations: [
      ],
      imports: [
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
      ]
    })
    export class CoreModule { }
    