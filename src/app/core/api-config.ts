import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ApiConfig {
    private _apiPath: string;
    private _filesPath: string;

    constructor() {
        this._apiPath = 'http://hockey.smargit.com/HockeyApp.WebApi/api/v1/';
        this._filesPath = 'http://hockey.smargit.com/HockeyApp.WebApi/';
    }

    get apiPath() : string {
        return this._apiPath;
    }

    get filesPath() : string {
        return this._filesPath;
    }
}