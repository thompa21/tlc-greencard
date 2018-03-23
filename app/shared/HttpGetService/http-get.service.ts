import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as applicationSettingsModule from "application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class HttpGetService {
    private webserviceUrl = "https://apps.lib.kth.se/webservices/";
    private serverUrl = "https://apps.lib.kth.se/webservices/grupprum/";

    constructor(private http: Http) { }
    
    private roomsUrl = 'https://apps.lib.kth.se/webservices/grupprum/v1';

    getData(bookingdate) {
        console.log("MyHttpGetService - getData");
        let headers = this.createRequestHeader();
        //let headers = new Headers();
        let params: URLSearchParams = new URLSearchParams();
        params.set("bookingdate", bookingdate);
        let options = new RequestOptions({ headers: headers, search: params });
        //console.log(this.serverUrl + "bookings");
        console.dir(options);
        return this.http.get(this.serverUrl + "bookings", options)
            .map(res => res.json())
            //.catch(this.handleErrorObservable);
        }
    
    private handleErrorObservable (error: Response | any) {
        console.log("handleErrorObservable");
        console.error(error.message || error);
        return RxObservable.throw(error.message || error);
    }
    
    getjwttoken(username, password) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let params: URLSearchParams = new URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get("https://apps.lib.kth.se/jwt/jwttokenalma.php", options)
            .map(res => res.json())
    }

    checkJWT() {
        const url = `${this.webserviceUrl}mrbs/api/v1/checkjwt/?token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    getuser() {
        const url = `${this.webserviceUrl}mrbs/api/v1/getuserfromtoken/?token=${applicationSettingsModule.getString('jwttoken')}`;
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