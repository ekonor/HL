import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { NgForm} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AlertService } from 'app/components/alert/alert.service';
import { TournamentService } from 'app/tournaments/shared/tournament.service';

/*import { TournamentAnnouncement } from 'app/tournament-announcements/shared/tournament-announcement';
import { Item } from 'app/tournament-announcements/shared/item';
import { City } from 'app/core/geo/city';

import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';*/



@Component({
  moduleId: module.id,
  selector: 'tournament-create',
  templateUrl: 'tournament-create.component.html'
})
export class TournamentCreateComponent implements OnInit {
  tournament: string;
  returnUrl: string;
  dataIsLoading: boolean;
  errorMessage: string;

  constructor( private tournamentService: TournamentService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.tournament = '123';
    this.dataIsLoading = false;
  }

  ngOnInit() {
  }

}
