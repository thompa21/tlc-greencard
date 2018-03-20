import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    constructor(
        private http: Http, private router: Router
    ) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
    }

    public login(username: string, password: string) {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        console.log('login');
        this.http.post("https://apps.lib.kth.se/webservices/mrbs/api/v1/entries", JSON.stringify({ username: username, password: password }), options)
            .map(result => result.json())
            .subscribe(result => {
                console.log(result);
                this.router.navigate(["game"], { queryParams: { jwt: result.token } });
            }, error => {
                //Toast.makeText(error.json().message).show();
                console.log(error.json().message);
            });
    }
    
}
