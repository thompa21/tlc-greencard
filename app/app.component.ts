import { Component } from "@angular/core";
import { isIOS } from "platform";
import { topmost } from "ui/frame";

import { registerElement } from "nativescript-angular";
registerElement("Gradient", () => require("nativescript-gradient").Gradient);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 

    constructor() {
        
    }

    ngOnInit() {
        if (isIOS) {
            console.log(topmost().ios.controller.navigationBar.barStyle);
            topmost().ios.controller.navigationBar.barStyle = 1;
            console.log(topmost().ios.controller.navigationBar.barStyle);
        }
    }
}
