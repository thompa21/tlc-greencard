import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
    selector: "Rules",
    moduleId: module.id,
    templateUrl: "./rules.component.html"
})

export class RulesComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private _changeDetectionRef: ChangeDetectorRef,
        private _page: Page
    ) {
        
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public gotopage(page){
        this.router.navigate([page],{ });
    }
}