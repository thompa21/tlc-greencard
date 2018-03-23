import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as applicationSettingsModule from "application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class HttpGetService {
    private webserviceUrl = "https://tlcgolfit.se/webservices/tlcgolfit/";

    constructor(private http: Http) { }
    
    private handleErrorObservable (error: Response | any) {
        console.log("handleErrorObservable");
        console.error(error.message || error);
        return RxObservable.throw(error.message || error);
    }

    checkJWT() {
        const url = `${this.webserviceUrl}api/v1/checkjwt/?token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    getuser() {
        const url = `${this.webserviceUrl}api/v1/getuserfromtoken/?token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        headers.append("Authkey", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
       
        return headers;
    }
}