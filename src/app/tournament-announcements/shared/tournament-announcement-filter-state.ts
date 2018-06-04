export class TournamentAnnouncementFilterState {
  isDraft: boolean = false;
  isRegistration: boolean = false;
  /*isWait?: string;
  isReject?: string;
  isFinished?: string;
  isCanceled?: string;
  isDeleted?: string;*/

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
