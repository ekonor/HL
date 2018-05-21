/* Упрощенная арена */

export class Arena {
    id: number;
    name: string;
    linkName?: string;
    logo?: string;

    constructor( values: Object = {} )
    {
      Object.assign( this, values );
    }
}
