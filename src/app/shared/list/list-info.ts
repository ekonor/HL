import { HttpParams } from "@angular/common/http";

export enum SortDir {
    Asc,
    Desc
}

export class ListInfo {
    skip : number;
    take : number; /// Сколько взять элеменов 

    get page():number {
        return Math.floor(this.skip / this.take) + 1; 
    }

    orderBy : string; // Поле сортировки      
    orderDir: SortDir; // Направление сортировки

    createFromParams(params: Object, pageSize: number){
        if(params["orderBy"]){
            this.orderBy = params["orderBy"];

            if(params["orderDir"]){
                let dir:string = params["orderDir"];
                this.orderDir = <SortDir>SortDir[dir];
            }
        }

        var page = params["page"] ? parseInt(params["page"]) : 1;

        this.skip = pageSize * (page - 1);
        this.take = pageSize;     
    }

    toParams(): HttpParams {
        let params = new HttpParams();
        
        if(this.orderBy){
            params = params.append("orderBy", this.orderBy);

            if(this.orderDir)
                params = params.append("orderDir", SortDir[this.orderDir]);
        }
        if(this.skip != null)
            params = params.append("skip", this.skip.toString());
        if(this.take != null)
            params = params.append("take", this.take.toString());

        return params;
    }
}