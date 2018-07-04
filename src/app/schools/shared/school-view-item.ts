/* Школа для просмотра, редактирования и создания на отдельной странице */

import { City } from 'app/core/geo/city';
import { Arena } from 'app/arenas/shared/arena';

export class SchoolViewItem {
  id: number;
  name: string;
  linkName: string;
  fullName?: string;
  address?: string;
  email?: string;
  webSite?: string;
  capacity?: number;
  logo?: string;
  city?: City = new City;
  arena: Arena = new Arena;
  phone?: string;
  about?: string;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
