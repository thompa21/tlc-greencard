import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

@Component({
    selector: "Game",
    moduleId: module.id,
    templateUrl: "./game.component.html"
})
export class GameComponent implements OnInit {
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/

    }
    showvideo: boolean
    @ViewChild("video_player") videoPlayer: ElementRef;

    public src: string = "https://tlcgolfit.se/videos/IMG_0010.MOV"

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.showvideo = true;
        this.videoPlayer.nativeElement.play();
       
    }

    loadvideo(src) {
        this.showvideo = true;
    }

    unloadvideo() {
        this.showvideo = false;
    }
}
