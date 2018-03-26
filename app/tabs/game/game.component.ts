import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

//import {registerElement} from "nativescript-angular/element-registry";
import { RouterExtensions } from "nativescript-angular/router";

//registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

@Component({
    selector: "Game",
    moduleId: module.id,
    templateUrl: "./game.component.html"
})
export class GameComponent implements OnInit {
    constructor(
        private router: RouterExtensions
    ) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/

    }
    showvideo: boolean
    //@ViewChild("video_player") videoPlayer: ElementRef;

    //public src: string = "https://tlcgolfit.se/videos/IMG_0010.MOV";
    //public src: string = "https://archive.org/download/ksnn_compilation_master_the_internet/ksnn_compilation_master_the_internet_512kb.mp4"
    

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.showvideo = true;
        //this.videoPlayer.nativeElement.play();
       
    }

    loadvideo(src) {
        this.showvideo = true;
        this.router.navigate(["videoscreen"]);
    }

    unloadvideo() {
        this.showvideo = false;
    }
}
