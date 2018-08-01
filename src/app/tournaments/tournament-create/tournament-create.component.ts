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
  ageTypes: Array<Item>;

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
    this.getAgeTypes();
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

  private getAgeTypes() {
    this.ageTypes = new Array<Item>();
    this.ageTypes.push(new Item({value: 'Juniors', name: 'Юниоры 14-16 лет'}));
    this.ageTypes.push(new Item({value: 'Young', name: 'Молодежь 16-21 год'}));
    this.ageTypes.push(new Item({value: 'Adults', name: 'Взрослые старше 21 лет'}));
    this.ageTypes.push(new Item({value: '2011', name: '2011 г.р.'}));
    this.ageTypes.push(new Item({value: '2010', name: '2010 г.р.'}));
    this.ageTypes.push(new Item({value: '2009', name: '2009 г.р.'}));
    this.ageTypes.push(new Item({value: '2008', name: '2008 г.р.'}));
    this.ageTypes.push(new Item({value: '2007', name: '2007 г.р.'}));
    this.ageTypes.push(new Item({value: '2006', name: '2006 г.р.'}));
    this.ageTypes.push(new Item({value: '2005', name: '2005 г.р.'}));
    this.ageTypes.push(new Item({value: '2004', name: '2004 г.р.'}));
  }

  private onChangedStartDt(dt: Date) {
    this.tournament.startDate = dt;
  }

  private onChangedEndDt(dt: Date) {
    this.tournament.endDate = dt;
  }

}
