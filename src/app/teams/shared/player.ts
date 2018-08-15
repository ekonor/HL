export class Player {
  id: number; // номер, под которым играет
  name: string = null; // ФИО
  birthdate: Date = null; // Дата рождения

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
