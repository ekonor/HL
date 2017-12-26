import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ApiConfig {
    private _apiPath: string;
    private _filesPath: string;

    constructor() {
        this._apiPath = 'http://api.hockeylife.pro/v1/';
        this._filesPath = 'http://api.hockeylife.pro';
    }

    get apiPath(): string {
        return this._apiPath;
    }

    get filesPath(): string {
        return this._filesPath;
    }
}
