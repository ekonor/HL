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
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Team } from 'app/teams/shared/team';

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
  seasonTypes: Array<Item>;
  genderTypes: Array<Item>;

  city: City; // текущий город арены в поле ввода
  arena: ArenaListItem; // текущая арена в поле ввода
  team: Team; // текущая команда в поле ввода

  constructor( private tournamentService: TournamentService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.tournament = new Tournament();
    this.dataIsLoading = false;
    this.step = 2;
    this.oneDay = false;
    this.arena = null;
    this.team = null;
    this.getDivisionTypes();
    this.getAgeTypes();
    this.getSeasonTypes();
    this.getGenderTypes();
  }

  ngOnInit() {
  }

  public changeStep(step: number) {
    if (step > 0 && step < 7) {
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

  public addArena(arena: ArenaListItem) {
    console.log("add arena");
    if (arena) {
      this.tournament.arenas.push(arena);
      this.arena = null;
    }
  }

  public addTeam(team: Team) {
    console.log("add team");
    if (team) {
      this.tournament.teams.push(team);
      this.team = null;
    }
  }

  public removeArena(arena: ArenaListItem) {
    console.log("remove arena");
    if (arena) {
      this.tournament.arenas = this.tournament.arenas.filter(obj => obj !== arena);
      console.log(this.tournament.arenas.length);
    }
  }

  public removeTeam(team: Team) {
    console.log("remove team");
    if (team) {
      this.tournament.teams = this.tournament.teams.filter(obj => obj !== team);
      console.log(this.tournament.teams.length);
    }
  }

  private onChangedStartDt(dt: Date) {
    this.tournament.startDate = dt;
  }

  private onChangedEndDt(dt: Date) {
    this.tournament.endDate = dt;
  }

  public getAddIconClass() {
    return this.tournamentService.getAddIconClass();
  }

  public getDeleteIconClass() {
    return this.tournamentService.getDeleteIconClass();
  }

  public getMoveUpIconClass() {
    return this.tournamentService.getMoveUpIconClass();
  }

  public getMoveDownIconClass() {
    return this.tournamentService.getMoveDownIconClass();
  }

  private getSeasonTypes() {
    this.seasonTypes = new Array<Item>();
    this.seasonTypes.push(new Item({value: '2015-2016', name: '2015-2016'}));
    this.seasonTypes.push(new Item({value: '2016-2017', name: '2016-2017'}));
    this.seasonTypes.push(new Item({value: '2017-2018', name: '2017-2018'}));
    this.seasonTypes.push(new Item({value: '2018-2019', name: '2018-2019'}));
  }

  private getGenderTypes() {
    this.genderTypes =  new Array<Item>();
    this.genderTypes.push(new Item({value: 'Male', name: 'Мужчины'}));
    this.genderTypes.push(new Item({value: 'Female', name: 'Женщины'}));
  }

  private setCity(city: City) {
    if (city) {
      this.city = city;
    }
  }

  private setArena(arena: ArenaListItem) {
    if (arena) {
      this.arena = arena;
    }
    else {
      this.arena = null;
    }
  }

  createTeam() {
    // TODO разворачивание блока для добавления новой команды
  }

  createArena() {
    // TODO разворачивание блока для добавления новой арены
  }

  moveTeamUp(team: Team) {
    console.log("UP");
    let num = this.tournament.teams.indexOf(team);
    if (num!=-1 && num!= 0) {
      let moveTeam: Team = this.tournament.teams[num-1];
      this.tournament.teams[num-1] = team;
      this.tournament.teams[num] = moveTeam;
    }
  }

  moveArenaUp(arena: ArenaListItem) {
    console.log("UP");
    let num = this.tournament.arenas.indexOf(arena);
    if (num!=-1 && num!= 0) {
      let moveArena: ArenaListItem = this.tournament.arenas[num-1];
      this.tournament.arenas[num-1] = arena;
      this.tournament.arenas[num] = moveArena;
    }
  }

  moveTeamDown(team: Team) {
    console.log("DOWN");
    let num = this.tournament.teams.indexOf(team);
    let sz = this.tournament.teams.length;
    if (num!=-1 && num!=(sz-1)) {
      let moveTeam: Team = this.tournament.teams[num+1];
      this.tournament.teams[num+1] = team;
      this.tournament.teams[num] = moveTeam;
    }
  }

  moveArenaDown(arena: ArenaListItem) {
    console.log("DOWN");
    let num = this.tournament.arenas.indexOf(arena);
    let sz = this.tournament.arenas.length;
    if (num!=-1 && num!=(sz-1)) {
      let moveArena: ArenaListItem = this.tournament.arenas[num+1];
      this.tournament.arenas[num+1] = arena;
      this.tournament.arenas[num] = moveArena;
    }
  }

  private setTeam(team: Team) {
    if (team) {
      this.team = team;
    }
    else {
      this.team = null;
    }
  }
}
