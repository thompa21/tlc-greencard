import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";

import { Video } from "../../shared/video/video";

@Component({
    selector: "Game",
    moduleId: module.id,
    templateUrl: "./game.component.html"
})

export class GameComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private video: Video
    ) {
        
    }

    videoList: Array<Video> = [];
    
    ngOnInit(): void {
        this.videoList.push({ name: "Apples", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
        this.videoList.push({ name: "Bananas", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
        this.videoList.push({ name: "Oranges", url: "https://www.tlcgolfit.se/videos/chippning_1.mp4" });
    }

    public onItemTap(args) {
        console.dir(this.videoList[args.index].url);
        this.router.navigate(["videoscreen", this.videoList[args.index].url]);
    }
}
