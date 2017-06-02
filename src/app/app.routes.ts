import {Routes, RouterModule} from '@angular/router';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ArenasComponent } from './components/arenas/arenas.component';
import { HockeyNewsComponent } from './components/hockey-news/hockey-news.component';


export const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'hockey-news', component: HockeyNewsComponent},
  { path: 'tournaments', component: TournamentsComponent},
  { path: 'children-teams', component: ChildrenTeamsComponent},
  { path: 'arenas', component: ArenasComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
