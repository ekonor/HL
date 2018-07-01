/* Упрощенная школа */

export class School {
    id: number;
    name: string;
    linkName?: string;
    logo?: string;

    constructor( values: Object = {} ) {
      Object.assign( this, values );
    }
}
