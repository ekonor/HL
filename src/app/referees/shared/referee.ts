/* Упрощенный судья */

export class Referee {
    id: number;
    name: string;
    fullName: string;
    linkName: string = null;
    logo?: string = null;

    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
}
