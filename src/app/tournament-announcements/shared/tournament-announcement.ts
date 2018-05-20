export class TournamentAnnouncement {
  id: number;
  name: string; // Заголовок анонса
  tournamentId: number;
  cityId: number;
  arenaId: number;
  startDate?: Date; // Дата начала турнира
  endDate?: Date; // Дата окончания турнира
  endRegistrationDate?: Date; // Дата окончания регистрации (EndRegistrationDate)
  requiredResponseCount?: number; // Кол-во участников – максимально допустимое в турнире (RequiredResponseCount)
  isCommercial: boolean = true; // Признак коммерческий или нет (IsCommercial) – иконка
  cost?: number; // Если коммерческий, указать цену участия (Cost)
  costType?: string = 'PerPerson'; // Тип оплаты (CostType) - c человека или с команды
  ageGroup?: string; // Возрастная группа (AgeGroup
  minBirthYear?: number;
  maxBirthYear?: number;
  gender?: string = 'Male'; // Пол участников (Gender) – иконкой
  content?: string; // Текст анонса
  closeCondition: string = 'ResponseCountAccomplished';

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
