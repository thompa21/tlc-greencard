import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login.component";
import { VideoComponent } from "./video.component";
import { Data } from "./shared/Data/data";
import { Video } from "./shared/video/video";

import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        VideoComponent
    ],
    providers: [
        Data,
        Video
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
