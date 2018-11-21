import { Arena } from 'app/arenas/shared/arena';
import { Organization } from 'app/organizations/shared/organization';
import { City } from 'app/core/geo/city';
import { Team } from 'app/teams/shared/team';
import { Referee } from 'app/referees/shared/referee';
import { Game } from 'app/tournaments/shared/game';

export class Tournament {
  id: number;
  name: string; // Название турнира
  startDate?: Date; // Дата начала турнира
  endDate?: Date; // Дата окончания турнира
  ageGroup: string = null; // Возрастная группа
  year: number = null; // Год рождения
  gender: string = 'Male'; // Пол м/ж
  // division: string = null; // Дивизион/группы/этапы;
  season: string = null; // Сезон
  requiredResponseCount?: number; // Кол-во участников
  city: City = null; // Город проведения
  arenas: Array<Arena> = new Array<Arena>(); // Арены
  logo?: string;
  teams: Array<Team> = new Array<Team>(); // Команды-участники
  referees: Array<Referee> = new Array<Referee>(); // Судьи
  tournamentType: string = null; // Тип турнира
  twoWays: boolean = null; // Двухкруговой турнир
  // gameCount: number = null; // Количество игр;
  games: Array<Game> = new Array<Game>(); // Игры


  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
