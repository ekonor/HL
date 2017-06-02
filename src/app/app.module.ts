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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
