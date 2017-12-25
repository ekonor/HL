import { City } from "app/arenas/shared/city";
import { Arena } from "app/arenas/shared/arena";

export class SchoolListItem
{
    id:number;
    name: string;
    linkName: string;
    fullName: string;
    arena?: Arena;
    cityName?: string;

    //public long? CountryId { get; set; }
    //public virtual Country Country { get; set; }

    logo?: string;

    webSite?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export class SchoolViewItem
{
    id:number;
    name: string;
    linkName: string;
    fullName: string;
    arena?: Arena;
    city?: City;

    //public long? CountryId { get; set; }
    //public virtual Country Country { get; set; }

    logo?: string;

    webSite?: string;
    phone?: string;
    email?: string;
    address?: string;

    content: string;
}