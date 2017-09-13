import {Routes, RouterModule} from '@angular/router';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ArenasComponent } from './components/arenas/arenas.component';
import { HockeyNewsComponent } from './components/hockey-news/hockey-news.component';
import { LoginComponent } from "app/components/login/login.component";
import { RegisterComponent } from "app/components/register/register.component";
import {ArenaIdComponent} from "./components/arenas/arena-id/arena-id.component";


export const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'hockey-news', component: HockeyNewsComponent},
  { path: 'arenas/{id}', component: ArenaIdComponent},
  { path: 'tournaments', component: TournamentsComponent},
  { path: 'children-teams', component: ChildrenTeamsComponent},
  { path: 'arenas', component: ArenasComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
