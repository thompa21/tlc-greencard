import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { setInterval, setTimeout, clearInterval } from "timer";
import { HttpGetService } from "./shared/HttpGetService/http-get.service";

import * as applicationSettingsModule from "application-settings";

import { WebView, LoadEventData } from "ui/web-view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Label } from "ui/label";

import { Data } from "./shared/Data/data";

@Component({
    selector: "kthb-login",
    templateUrl: "login.component.html",
    providers: [HttpGetService]
})
export class LoginComponent {
    public webViewSrc: string = "";
    @ViewChild("myWebView") webViewRef: ElementRef;
    @ViewChild("urlField") urlFieldRef: ElementRef;
    @ViewChild("labelResult") labelResultRef: ElementRef;

    //user: User;
    loggedin: boolean;
    public input: any;
    
    constructor(private router: RouterExtensions, 
        private myGetService: HttpGetService,
        private ngZone: NgZone,
        private data: Data
    ) {
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        }
    }

    public getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public gotoapplication() {
        console.log('gotoapplication');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(() => {
            this.router.navigate(["home"],{ clearHistory: true })
        });
    }

    public gotologin() {
        console.log('gotologin');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(() => {
            this.router.navigate([""],{ clearHistory: true })
        });
    }

    ngAfterViewInit() {
        //this.router.navigate(["home"],{ clearHistory: true })
        let webview: WebView = this.webViewRef.nativeElement;
        let label: Label = this.labelResultRef.nativeElement;
        //label.text = "Loading...";
        var that = this;
        webview.on(WebView.loadFinishedEvent,  function (args: LoadEventData) {
            let message;
            if (!args.error) {
                //message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            //TODO hämta evetuell token från url
            var jwttoken = that.getParameterByName('jwttoken',args.url);
            if(jwttoken!="" && jwttoken!= null){
                console.log("jwttoken erhållen: " + jwttoken );
                //Spara token
                applicationSettingsModule.setString('jwttoken', jwttoken);
                
                //Skicka till applikation
                that.loggedin = true;
                that.gotoapplication();
            }

            if(args.url.indexOf("logout")!==-1) {
                console.log("Utloggad!");
                applicationSettingsModule.remove('jwttoken');
                applicationSettingsModule.remove('alma_primaryid');
                //Skicka till login
                that.loggedin = false;
                that.gotologin();
            }
        });
    }

    logintwitter() {
        //let textField: TextField = this.urlFieldRef.nativeElement;

            this.loggedin = true;
            this.webViewSrc = "https://tlcgolfit.se/twitterauth/twitter_login.php";
    }

    loginfacebook() {
        //let textField: TextField = this.urlFieldRef.nativeElement;

            this.loggedin = true;
            this.webViewSrc = "https://facebook.com";
    }

    logininstagram() {
        //let textField: TextField = this.urlFieldRef.nativeElement;

            this.loggedin = true;
            this.webViewSrc = "https://instagram.com";
    }

    ngOnInit() {
        console.log('appsettings:  ' + applicationSettingsModule.getString('jwttoken', 'unset'));
        if (applicationSettingsModule.getString('jwttoken', 'unset') !== 'unset'){
            this.myGetService.checkJWT()
            .subscribe(
                (result) => {
                if(result.authorized) {
                    this.loggedin = true;
                    this.gotoapplication();
                } else {
                    this.loggedin = false;
                    this.webViewSrc = "https://tlcgolfit.se/twitterauth/twitter_logout.php"
                }
            }, (error) => {
                console.log(error);
                this.loggedin = false;
                this.webViewSrc = "https://tlcgolfit.se/twitterauth/twitter_logout.php"
            });
        } else {
            //this.loggedin = false;
        }
        //Skicka till KTH logout om storage är satt
        if (this.data.storage) {
            this.loggedin = false;
            console.log(this.data.storage.logout);
            this.data.storage.length = 0;
            this.webViewSrc = "https://tlcgolfit.se/twitterauth/twitter_logout.php"
            
        } else {
            //this.loggedin = true;
            //this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
        }
        /*
        console.log("login_nginit");
        if (typeof applicationSettingsModule.getString('jwttoken') !== "undefined") {
            console.log("jwttoken: " + applicationSettingsModule.getString('jwttoken'));
            this.loggedin = true;
            console.log(this.loggedin);
            this.router.navigate(["/tabs"],{ clearHistory: true })
        } else {
            this.loggedin = false;
            console.log("not logged in");
        }
        */
    }

    public logout() {
        applicationSettingsModule.remove('jwttoken');
        this.loggedin = false;
    }

    public authcallback() {
    }
}
