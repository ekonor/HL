import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { LoginComponent } from "app/components/login/login.component";
import { RegisterComponent } from "app/components/register/register.component";
import { AuthGuard } from "app/auth/auth.guard";
import { AlertService } from "app/components/alert/alert.service";
import { AuthenticationService } from "app/auth/authentication.service";
import { UserService } from "app/auth/user.service";
import { AlertComponent } from "app/components/alert/alert.component";

import { AgmCoreModule } from '@agm/core';


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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpuC7_aFMwlRMvHJJgDFsQ0M5_6RlzNYA'
    })
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
