export enum SortDir {
    Asc,
    Desc
}

export class ListInfo {
    skip : number;
    take : number; /// Сколько взять элеменов 
    orderBy : string; // Поле сортировки      
    orderDir: SortDir; // Направление сортировки
}