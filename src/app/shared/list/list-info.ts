export enum SortDir {
    Asc,
    Desc
}

export class ListInfo{
    Skip : number;

    /// Сколько взять элеменов 
    Take : number;

    /// Поле сортировки      
    OrderBy : string;

    /// Направление сортировки
    OrderDir: SortDir;

    /// Текст поиска
    SearchText: string;
}