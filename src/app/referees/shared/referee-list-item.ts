/* Судья в общем списке или select-е */

import { RefereeType } from 'app/referees/shared/referee-type';
import { City } from 'app/core/geo/city';

export class RefereeListItem {
  id: number;
  name: string;
  fullName: string;
  linkName: string;
  birthdate?: Date = null;
  gender?: string = null;
  city?: City = null;
  logo?: string = null;
  number?: number = null;
  refereeAmplua?: string = null;
  refereeType?: RefereeType = null;

  constructor( values: Object = {} )
  {
    Object.assign( this, values );
  }
}
