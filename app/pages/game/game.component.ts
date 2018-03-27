import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { Video } from "../../shared/video/video";

@Component({
    selector: "Game",
    moduleId: module.id,
    templateUrl: "./game.component.html"
})

export class GameComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private _changeDetectionRef: ChangeDetectorRef,
        private _page: Page,
        private video: Video
    ) {
        
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    videoList: Array<Video> = [];
    
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.videoList.push({ name: "Apples", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
        this.videoList.push({ name: "Bananas", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
        this.videoList.push({ name: "Oranges", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
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

    public onItemTap(args) {
        console.dir(this.videoList[args.index].url);
        this.router.navigate(["videoscreen", this.videoList[args.index].url]);
    }
}
