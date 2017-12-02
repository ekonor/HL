export enum SortDir {
    Asc,
    Desc
}

export class ListInfo {
    skip : number;
    take : number; /// Сколько взять элеменов 

    get page():number {
        return (this.skip || 0 / this.take || 0) + 1; 
    }

    orderBy : string; // Поле сортировки      
    orderDir: SortDir; // Направление сортировки
}