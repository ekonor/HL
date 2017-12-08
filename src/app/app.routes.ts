import { Routes, RouterModule } from '@angular/router';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { LoginComponent } from "./components/login/login.component";


export const routes: Routes =[
  { path: '', component: HomeComponent },
  // { path: 'tournaments', component: TournamentsComponent },
  // { path: 'children-teams', component: ChildrenTeamsComponent },
  // { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
