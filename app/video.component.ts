import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { on } from "tns-core-modules/application/application";
import { screen, isIOS, isAndroid } from "tns-core-modules/platform/platform"
import { EventData } from "data/observable"
import { Page } from "ui/page";

import {ActivatedRoute} from "@angular/router";

import frame = require("ui/frame");

import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation'

import { Data } from "./shared/Data/data";

import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

//för att native "android" ska fungera
declare var android: any

@Component({
    selector: "VideoScreen",
    moduleId: module.id,
    templateUrl: "./video.component.html"
})

export class VideoComponent implements OnInit {
    constructor(
        private _page: Page,
        private data: Data,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params) => {
            this.src = params["url"];
        });

        _page.on("navigatedTo",function(){
            setCurrentOrientation("landscape",function(){
            console.log("landscape orientation");
            });
        });
        
        _page.on("navigatingFrom",function(){
            
            if(!isAndroid){
                frame.topmost().android.activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
            }
            orientationCleanup();
        });

    }

    id: number;
    showvideo: boolean;
    @ViewChild("video_player") videoPlayer: ElementRef;
    public src: string;

    ngOnInit(): void {
        //if (this.data.videourl) {
            //this.src = this.data.videourl.url
        //}

        if(!isAndroid){
            frame.topmost().android.activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                | android.view.View.SYSTEM_UI_FLAG_FULLSCREEN);
        }
        this._page.actionBarHidden = true;
        this.showvideo = true;
        this.videoPlayer.nativeElement.play();
    }
    //behövs tillbakaknapp för IOS?
    unloadvideo() {
        this.showvideo = false;
    }
}
