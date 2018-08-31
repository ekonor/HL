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
import { ArenaService } from 'app/arenas/shared/arena.service';
import { TeamService } from 'app/teams/shared/team.service';
import { RefereeService } from 'app/referees/shared/referee.service';

import { Tournament } from 'app/tournaments/shared/tournament';
import { Item } from 'app/tournament-announcements/shared/item';
import { City } from 'app/core/geo/city';
import { ArenaListItem } from 'app/arenas/shared/arena-list-item';
import { Team } from 'app/teams/shared/team';
import { ArenaFastCreation } from 'app/arenas/shared/arena-fast-creation';
import { RefereeFastCreation } from 'app/referees/shared/referee-fast-creation';
import { RefereeListItem } from 'app/referees/shared/referee-list-item';
import { Referee } from 'app/referees/shared/referee';

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
  newarena: ArenaFastCreation; // новая арена
  team: Team; // текущая команда в поле ввода

  referee: RefereeListItem; // текущий судья в поле ввода
  newreferee: RefereeFastCreation; // новый судья

  toggledNewArena: boolean = false;
  // toggledNewTeam: boolean = false;
  toggledNewReferee: boolean = false;

  activeArena: ArenaListItem; // выделенная строка в таблице
  activeTeam: Team; // выделенная строка в таблице
  activeReferee: RefereeListItem; // выделенная строка в таблице

  constructor( private tournamentService: TournamentService,
               private arenaService: ArenaService,
               private teamService: TeamService,
               private refereeService: RefereeService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private alertService: AlertService ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.dataIsLoading = true;
    this.tournament = new Tournament();
    this.dataIsLoading = false;
    this.step = 4;
    this.oneDay = false;
    this.arena = null;
    this.newarena = new ArenaFastCreation();
    this.team = null;
    this.referee = null;
    this.newreferee = new RefereeFastCreation();
    this.activeReferee = null;
    // this.newteam = new Team();
    this.activeArena = null;
    this.activeTeam = null;
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

  public addReferee(referee: RefereeListItem) {
    console.log("add referee");
    if (referee) {
      this.tournament.referees.push(referee);
      this.referee = null;
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

  public removeReferee(referee: Referee) {
    console.log("remove referee");
    if (referee) {
      this.tournament.referees = this.tournament.referees.filter(obj => obj !== referee);
      console.log(this.tournament.referees.length);
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

  public getPlayersIconClass() {
    return this.tournamentService.getPlayersIconClass();
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

  createArena(arena: ArenaFastCreation, form: NgForm) {
    if (!this.newarena || this.newarena == null ) { return; }
    if (confirm('Вы действительно хотите создать новую арену?')) {
      // TODO проверка существования города
      this.dataIsLoading = true;
      this.arenaService.addArenaFast(this.newarena).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось создать арену');
          this.dataIsLoading = false;
          alert('Не удалось создать арену');
        },
        () => {
          this.dataIsLoading = false;
          alert('Арена создана успешно. Теперь Вы можете добавить ее в список через поиск арен');
          this.newarena = null;
          this.toggledNewArena = false;
        });
      this.dataIsLoading = false;
    }
    this.dataIsLoading = false;
  }

  createReferee(referee: RefereeFastCreation, form: NgForm) {
    if (!this.newreferee || this.newreferee == null ) { return; }
    if (confirm('Вы действительно хотите создать нового судью?')) {
      // TODO проверка существования города
      this.dataIsLoading = true;
      this.refereeService.addRefereeFast(this.newreferee).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось создать судью');
          this.dataIsLoading = false;
          alert('Не удалось создать судью');
        },
        () => {
          this.dataIsLoading = false;
          alert('Судья создан успешно. Теперь Вы можете добавить его в список через поиск судей');
          this.newreferee = null;
          this.toggledNewReferee = false;
        });
      this.dataIsLoading = false;
    }
    this.dataIsLoading = false;
  }



  /* createTeam(team: Team, form: NgForm) {
    if (!this.newteam || this.newteam == null ) { return; }
    if (confirm('Вы действительно хотите создать  новую команду?')) {
      // TODO проверка существования города
      this.dataIsLoading = true;
      this.teamService.addTeamFast(this.newteam).subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
          this.alertService.error('Не удалось создать команду');
          this.dataIsLoading = false;
          alert('Не удалось создать команду');
        },
        () => {
          this.dataIsLoading = false;
          alert('Команда создана успешно. Теперь Вы можете добавить ее в список через поиск команд');
          this.newteam = null;
          this.toggledNewTeam = false;
        });
      this.dataIsLoading = false;
    }
    this.dataIsLoading = false;
  } */

  setSelectionArena(arena: ArenaListItem) {
    if (arena) {
      this.activeArena = arena;
    }
  }

  setSelectionReferee(referee: RefereeListItem) {
    if (referee) {
      this.activeReferee = referee;
    }
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

  moveRefereeUp(referee: Referee) {
    console.log("UP");
    let num = this.tournament.referees.indexOf(referee);
    if (num!=-1 && num!= 0) {
      let moveReferee: Referee = this.tournament.referees[num-1];
      this.tournament.referees[num-1] = referee;
      this.tournament.referees[num] = moveReferee;
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


  moveRefereeDown(referee: RefereeListItem) {
    console.log("DOWN");
    let num = this.tournament.referees.indexOf(referee);
    let sz = this.tournament.referees.length;
    if (num!=-1 && num!=(sz-1)) {
      let moveReferee: RefereeListItem = this.tournament.referees[num+1];
      this.tournament.referees[num+1] = referee;
      this.tournament.referees[num] = moveReferee;
    }
  }

  setSelectionTeam(team: Team) {
    if (team) {
      this.activeTeam = team;
    }
  }

  changePlayers(team: Team) {
    // форма всплывающая для изменения заявленного состава команды
  }

  private setTeam(team: Team) {
    if (team) {
      this.team = team;
    } else {
      this.team = null;
    }
  }

  private setNewArenaCity(city: City) {
    if (city) {
      this.newarena.city = city;
    }
  }

  private setArena(arena: ArenaListItem) {
    if (arena) {
      this.arena = arena;
    } else {
      this.arena = null;
    }
  }

  private setReferee(referee: RefereeListItem) {
    if (referee) {
      this.referee = referee;
    } else {
      this.referee = null;
    }
  }

  /* private setNewTeamCity(city: City) {
    if (city) {
      this.newteam.city = city;
    }
  } */
}
