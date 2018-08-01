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

import { Tournament } from 'app/tournaments/shared/tournament';
import { Item } from 'app/tournament-announcements/shared/item';
import { City } from 'app/core/geo/city';

/* import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Arena } from 'app/arenas/shared/arena';*/



@Component({
  moduleId: module.id,
  selector: 'tournament-create',
  templateUrl: 'tournament-create.component.html'
})
export class TournamentCreateComponent implements OnInit {
  tournament: Tournament;
  returnUrl: string;
  dataIsLoading: boolean;
  errorMessage: string;

  step: number;
  oneDay: boolean;
  divisionTypes: Array<Item>;

  constructor( private tournamentService: TournamentService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.tournament = new Tournament();
    this.dataIsLoading = false;
    this.step = 1;
    this.oneDay = false;
    this.getDivisionTypes();
  }

  ngOnInit() {
  }

  public changeStep(step: number) {
    if (step > 0 && step < 4) {
      this.step = step;
    }
  }

  private getDivisionTypes() {
    this.divisionTypes = new Array<Item>();
    this.divisionTypes.push(new Item({value: null, name: 'Нет этапов'}));
    this.divisionTypes.push(new Item({value: 'A', name: 'Группа "A"'}));
    this.divisionTypes.push(new Item({value: 'B', name: 'Группа "B"'}));
    this.divisionTypes.push(new Item({value: 'C', name: 'Группа "C"'}));
    this.divisionTypes.push(new Item({value: 'D', name: 'Группа "D"'}));
    this.divisionTypes.push(new Item({value: '1', name: '1 этап'}));
    this.divisionTypes.push(new Item({value: '2', name: '2 этап'}));
    this.divisionTypes.push(new Item({value: '3', name: '3 этап'}));
    this.divisionTypes.push(new Item({value: '4', name: '4 этап'}));
  }
}
