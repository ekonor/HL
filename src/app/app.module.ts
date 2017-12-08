import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';

import { routing, appRoutingProviders } from './app.routes';
import { SlidesComponent } from './components/home/slides/slides.component';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

import { AlertService } from "app/components/alert/alert.service";
import { AlertComponent } from "app/components/alert/alert.component";
import { AgmCoreModule } from '@agm/core';
import { ArenaModule } from 'app/arenas/arenas.module';
import { CoreModule } from 'app/core/core.module';
import { NewsModule } from 'app/news/news.module';
import { SharedModule } from 'app/shared/shared.module';

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
    SlidesComponent,
    AlertComponent,

    LoginComponent,
    RegisterComponent
   /* LoginComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfirmEmailResultComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ForgotPasswordComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxIKhPCTX9mEy_Jnjn5133_3vuNaILh00'
    }),
    CoreModule,
    SharedModule,
    ArenaModule,
    NewsModule
  ],
  providers: [
    appRoutingProviders,
    AlertService,
    CookieService
  ],
  bootstrap: [AppComponent]
  // schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
