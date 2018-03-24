import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";

import { Router } from "@angular/router";
import { HttpGetService } from "../../shared/HttpGetService/http-get.service";
import * as applicationSettingsModule from "application-settings";

import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { isAndroid, isIOS } from "platform";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [HttpGetService],
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit, OnInit {

    private _mainContentText: string;

    constructor(
        private router: Router,
        private myGetService: HttpGetService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    public username = "";
    public android: boolean;
    public ios: boolean;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
       if (isAndroid){
                this.android = true;
                this.ios = false;
        } else {
            this.android = false;
            this.ios = true;
        }
       this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";

       //Hämta information från token
       this.myGetService.getuser()
       .subscribe(
           (result) => {
               console.dir(result);
               this.username = "Välkommen " + result.data.userName
               /*
               this.myGetService.getAlmaUser(applicationSettingsModule.getString('alma_primaryid'))
                   .subscribe((result) => {
                       
                   }, (error) => {
                       
                   });*/
           }, 
           (error) => {
               console.log(error);
           });

    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }
    
}
