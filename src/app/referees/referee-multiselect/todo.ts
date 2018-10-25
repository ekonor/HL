export class Todo {
  title: string;
  completed: boolean;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}

