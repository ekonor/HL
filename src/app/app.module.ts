import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ArenasComponent } from './components/arenas/arenas.component';
import { HockeyNewsComponent } from './components/hockey-news/hockey-news.component';
import { routing, appRoutingProviders } from './app.routes';
import { SlidesComponent } from './components/home/slides/slides.component';

import { LoginComponent } from "app/components/account/login/login.component";
import { ForgotPasswordComponent } from "app/components/account/forgot-password/forgot-password.component";
import { RegisterComponent } from "app/components/account/register/register.component";
import { ForgotPasswordConfirmationComponent } from 'app/components/account/forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from 'app/components/account/reset-password/reset-password.component';

import { AuthGuard } from "app/auth/auth.guard";
import { AlertService } from "app/components/alert/alert.service";
import { AuthenticationService } from "app/auth/authentication.service";
import { UserService } from "app/auth/user.service";
import { AlertComponent } from "app/components/alert/alert.component";
import { AgmCoreModule } from '@agm/core';
import { ArenasService } from "./components/arenas/arenas.service";
import { ArenasIdComponent } from './components/arenas/arenas-id.component';
import { ResetPasswordConfirmationComponent } from 'app/components/account/reset-password-confirmation/reset-password-confirmation.component';
import { ConfirmEmailComponent } from 'app/components/account/confirm-email/confirm-email.component';
import { ConfirmEmailResultComponent } from 'app/components/account/confirm-email-result/confirm-email-result.component';

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    ChildrenTeamsComponent,
    AboutComponent,
    NotFoundComponent,
    HomeComponent,
    TournamentsComponent,
    ArenasComponent,
    HockeyNewsComponent,
    SlidesComponent,
    AlertComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfirmEmailResultComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ArenasIdComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpuC7_aFMwlRMvHJJgDFsQ0M5_6RlzNYA'
    })
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ArenasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
