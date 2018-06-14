export class TournamentAnnouncementFilterAge {
  isAdults: boolean = false;
  isYouth: boolean = false;
  isJuniors: boolean = false;
  isKids: boolean = false;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
