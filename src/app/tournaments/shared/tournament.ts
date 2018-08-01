import { Arena } from 'app/arenas/shared/arena';
import { Organization } from 'app/organizations/shared/organization';
import { City } from 'app/core/geo/city';
import { Team } from 'app/teams/shared/team';

export class Tournament {
  id: number;
  name: string; // Название турнира
  startDate?: Date; // Дата начала турнира
  endDate?: Date; // Дата окончания турнира
  ageGroup?: string; // Возрастная группа
  division: string = null; // Дивизион/группы/этапы;
  requiredResponseCount?: number; // Кол-во участников
  city: City = null; // Город проведения
  arena: Arena = null; // Арена
  logo?: string;
  ageGroup?: string; // Возрастная группа/год рождения
  teams?: Team[];
  //minAge?: number; // Если Возрастная группа дети или подростки, то можно указать еще год рождения участников от – до
  //maxAge?: number;
  /*logo?: string;
  state?: string; // Статус анонса (State)
  organization?: Organization; // Организатор турнира
  tournamentId: number;
  cityName?: string; // city: City; // Город проведения
  linkName: string; // ?
  arena?: Arena; // Арена
  startDate?: Date; // Дата начала турнира
  endDate?: Date; // Дата окончания турнира
  createDate?: string; // Дата создания (CreateDate)
  endRegistrationDate?: Date; // Дата окончания регистрации (EndRegistrationDate)
  requiredResponseCount?: number; // Кол-во участников – максимально допустимое в турнире (RequiredResponseCount)
  isCommercial: boolean = true; // Признак коммерческий или нет (IsCommercial) – иконка
  cost?: number; // Если коммерческий, указать цену участия (Cost)
  costType?: string; // Тип оплаты (CostType) - c человека или с команды
  ageGroup?: string; // Возрастная группа (AgeGroup
  minAge?: number; // Если Возрастная группа дети или подростки, то можно указать еще год рождения участников от – до
  maxAge?: number;
  gender?: string = 'Male'; // Пол участников (Gender) – иконкой*/

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
