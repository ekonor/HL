import { Routes, RouterModule } from '@angular/router';
import { ChildrenTeamsComponent } from './components/children-teams/children-teams.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { HockeyNewsComponent } from './components/hockey-news/hockey-news.component';
import { ArenasComponent } from './components/arenas/arenas.component';
import { ArenasIdComponent } from "./components/arenas/arenas-id.component";

//import  { AdminComponent } from "./components/admin/admin.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

/*import { LoginComponent } from "app/components/account/login/login.component";
import { RegisterComponent } from "app/components/account/register/register.component";
import { ForgotPasswordComponent } from 'app/components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'app/components/account/reset-password/reset-password.component';
import { ForgotPasswordConfirmationComponent } from 'app/components/account/forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordConfirmationComponent } from 'app/components/account/reset-password-confirmation/reset-password-confirmation.component';
import { ConfirmEmailComponent } from 'app/components/account/confirm-email/confirm-email.component';
import { ConfirmEmailResultComponent } from 'app/components/account/confirm-email-result/confirm-email-result.component';
*/

export const routes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'hockey-news', component: HockeyNewsComponent },
  { path: 'arenas/:id', component: ArenasIdComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'children-teams', component: ChildrenTeamsComponent },
  { path: 'arenas', component: ArenasComponent },
  { path: 'about', component: AboutComponent },

  //{ path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /*{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'confirm-email-result?userId={userId}&code={code}', component: ConfirmEmailResultComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password-confirmation', component: ForgotPasswordConfirmationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-confirmation', component: ResetPasswordConfirmationComponent },*/
  { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
