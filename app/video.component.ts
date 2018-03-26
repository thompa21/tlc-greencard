import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { on } from "tns-core-modules/application/application";
import { screen, isIOS, isAndroid } from "tns-core-modules/platform/platform"
import { EventData } from "data/observable"
import { Page } from "ui/page";

import frame = require("ui/frame");

import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

declare var android: any
@Component({
    selector: "VideoScreen",
    moduleId: module.id,
    templateUrl: "./video.component.html"
})
export class VideoComponent implements OnInit {
    constructor(private _page: Page) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
       on("orientationChanged", this.onOrientationChanged);
    }
    showvideo: boolean
    @ViewChild("video_player") videoPlayer: ElementRef;

    public fill: boolean = false;
    public src: string = "https://archive.org/download/ksnn_compilation_master_the_internet/ksnn_compilation_master_the_internet_512kb.mp4"
    
    public height = Math.floor(screen.mainScreen.widthPixels*9/16)/2;

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        if(isAndroid){
            frame.topmost().android.activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_FULLSCREEN);
        }
        this._page.actionBarHidden = true;
        this.showvideo = true;
        this.videoPlayer.nativeElement.play();
    }

    public onOrientationChanged = (evt) => {
        console.log("Orientation has changed !");
        console.log(evt.eventName); // orientationChanged
        console.log(evt.newValue); //landscape or portrait
        
        let height = Math.floor(screen.mainScreen.widthPixels*9/16)/2;
        if(evt.newValue == "landscape") {
            let height = screen.mainScreen.heightPixels;
        } else {
            
        }
        this.height = height;
        let time = this.videoPlayer.nativeElement.getCurrentTime();
        this.videoPlayer.nativeElement.seekToTime(time);
      };

    public onSeekToTimeComplete(evt: EventData){
        console.log("seek to time done");
        
    }

    unloadvideo() {
        this.showvideo = false;
    }
}
