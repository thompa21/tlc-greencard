import { Component, OnInit } from "@angular/core";

import {registerElement} from "nativescript-angular/element-registry";

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

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/

       registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);
    }
}
