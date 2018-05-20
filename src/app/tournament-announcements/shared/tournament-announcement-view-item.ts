import { Coordinates } from 'app/core/geo/coordinates';
import { City } from 'app/core/geo/city';
import { Arena } from 'app/arenas/shared/arena';
import { Organization } from 'app/tournament-announcements/shared/organization';
import { Team } from 'app/tournament-announcements/shared/team';

export class TournamentAnnouncementViewItem {
  id: number;
  name: string; // Заголовок анонса
  logo?: string;
  state?: string; // Статус анонса (State)
  organization?: Organization; // Организатор турнира
  tournamentId: number;
  city: City; // Город проведения
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
  gender?: string = 'Male'; // Пол участников (Gender) – иконкой
  content?: string; // Текст анонса
  coordinates?: Coordinates; // Размещение места нахождения арены
  teams?: Team[]; // Показаны   команды,   участие   которых   в   турнире   подтверждено   организатором
  currentResponseCount?: number; // сколько заявок утверждено
  closeCondition?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
