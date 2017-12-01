import { TestBed, inject } from '@angular/core/testing';

import { ArenaService } from './arena.service';

describe('ArenaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArenaService]
    });
  });

  it('should ...', inject([ArenaService], (service: ArenaService) => {
    expect(service).toBeTruthy();
  }));
});


/*import {TestBed, inject} from '@angular/core/testing';

import { Arena } from './arenas';
import { ArenaService } from './arenas.service';

describe( 'Arenas Service', () =>
{

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ArenaService
    ]})
  );

  describe('#getAllArenas()', () =>
  {
    it( 'должно возвращать пустой массив по молчанию', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      expect( service.getAllArenas() ).toEqual( [] );
    }) );

    it( 'должно возвращать все arenas', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena1 = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });
      let arena2 = new Arena({ name: 'Арена 2', address: 'адрес 2', logo: 'лого 2', cityName: 'город 2' });

      service.addArena( arena1 );
      service.addArena( arena2 );

      expect( service.getAllArenas() ).toEqual( [ arena1, arena2 ] );
    }) );
  });

  describe( '#save(arena)', () =>
  {
    it( 'должно автоматически назначать увеличенный ид', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena1 = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });
      let arena2 = new Arena({ name: 'Арена 2', address: 'адрес 2', logo: 'лого 2', cityName: 'город 2' });

      service.addArena( arena1 );
      service.addArena( arena2 );

      expect( service.getArenaById( 1 ) ).toEqual( arena1 );
      expect( service.getArenaById( 2 ) ).toEqual( arena2 );
    }) );
  });

  describe( '#deleteArenaById(id)', () =>
  {
    it( 'должно удалять arena по соответствующему ид', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena1 = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });
      let arena2 = new Arena({ name: 'Арена 2', address: 'адрес 2', logo: 'лого 2', cityName: 'город 2' });

      service.addArena( arena1 );
      service.addArena( arena2 );

      expect( service.getAllArenas() ).toEqual([ arena1, arena2 ]);
      service.deleteArenaById( 1 );

      expect( service.getAllArenas() ).toEqual([ arena2 ]);
      service.deleteArenaById( 2 );

      expect( service.getAllArenas() ).toEqual([]);
    }) );

    it( 'не должно ничего удалять, если arena с соответствующим ид не найдено', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena1 = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });
      let arena2 = new Arena({ name: 'Арена 2', address: 'адрес 2', logo: 'лого 2', cityName: 'город 2' });

      service.addArena( arena1 );
      service.addArena( arena2 );

      expect( service.getAllArenas() ).toEqual([ arena1, arena2 ]);
      service.deleteArenaById( 3 );
      expect( service.getAllArenas() ).toEqual([ arena1, arena2 ]);
    }) );
  });

  describe( '#updateArenaById(id, values)', () =>
  {
    it( 'должно возвращать arena с соответствующим ид и обновленными данными', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });

      service.addArena( arena );
      let updatedArena = service.updateArenaById( 1, {
        name: 'новое название'
      } );

      expect( updatedArena.name ).toEqual( 'новое название');
    }) );

    it( 'должно вернуть null, если arena не найден', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });

      service.addArena(arena);
      let updatedArena = service.updateArenaById( 2, {
        name: 'новое название'
      });

      expect( updatedArena ).toEqual( null );
    }) );
  });

  describe( '#changeArenaName(arena)', () =>
  {
    it( 'должно вернуть обновленный arena с новым названием', inject( [ ArenaService ], ( service: ArenaService ) =>
    {
      let arena = new Arena({ name: 'Арена 1', address: 'адрес 1', logo: 'лого 1', cityName: 'город 1' });
      service.addArena( arena );
      let updatedArena = service.changeArenaName( arena, 'Арена 2' );

      expect( arena.name ).toEqual( 'Арена 2' );
    }) );
  });*/

  /*describe( '#toggleTodoComplete(todo)', () =>
  {
    it( 'должно вернуть обновленный todo с противоположным статусом', inject( [ TodoService ], ( service: TodoService ) =>
    {
      let todo = new Todo({ title: 'Hello 1', complete: false });

      service.addTodo( todo );
      let updatedTodo = service.toggleTodoComplete( todo );

      expect( updatedTodo.complete ).toEqual( true );
      service.toggleTodoComplete( todo );
      expect( updatedTodo.complete ).toEqual( false );
    }) );
  });*/
//});


