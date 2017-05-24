import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
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
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'hockey-news', component: HockeyNewsComponent},
  { path: 'tournaments', component: TournamentsComponent},
  { path: 'children-teams', component: ChildrenTeamsComponent},
  { path: 'arenas', component: ArenasComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: NotFoundComponent }
];

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
