import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
// import { Ng2Permission } from 'angular2-permission';

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
// import { NgxPermissionsModule } from 'ngx-permissions';
import { SlidesComponent } from './components/home/slides/slides.component';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { AuthGuard } from 'app/core/auth/auth.guard';
import { UserService } from 'app/core/auth/user.service';
import { ApiConfig } from 'app/core/api-config';

import { AlertService } from 'app/components/alert/alert.service';
import { AlertComponent } from 'app/components/alert/alert.component';
import { AgmCoreModule } from '@agm/core';
import { ArenaModule } from 'app/arenas/arenas.module';
import { CoreModule } from 'app/core/core.module';
import { NewsModule } from 'app/news/news.module';
import { SharedModule } from 'app/shared/shared.module';
import { SchoolModule } from 'app/schools/schools.module';


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
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    // Ng2Permission,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpuC7_aFMwlRMvHJJgDFsQ0M5_6RlzNYA'
    }),
    // NgxPermissionsModule.forRoot(),
    CoreModule,
    SharedModule,
    ArenaModule,
    NewsModule,
    SchoolModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    appRoutingProviders,
    AuthGuard,
    ApiConfig,
    AlertService,
    CookieService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
  // schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule { }
