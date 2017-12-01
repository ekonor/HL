export class ListFilter<T> {
    take: number = 10; // К-во элеметов списка
    skip: number = 0; // Начиная с
    orderBy?: string; // Поле сортировки
    orderDir: string; // Направление сортировки
    filter: T;
  }