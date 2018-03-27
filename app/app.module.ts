import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login.component";
import { VideoComponent } from "./video.component";
import { HomeComponent } from "./pages/home/home.component";
import { EthicsComponent } from "./pages/ethics/ethics.component";
import { RulesComponent } from "./pages/rules/rules.component";
import { GameComponent } from "./pages/game/game.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { Data } from "./shared/Data/data";
import { Video } from "./shared/video/video";

import { NativeScriptHttpModule } from "nativescript-angular/http";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        VideoComponent,
        HomeComponent,
        EthicsComponent,
        RulesComponent,
        GameComponent,
        SettingsComponent

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
