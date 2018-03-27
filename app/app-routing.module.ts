import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login.component";
import { VideoComponent } from "./video.component";
import { HomeComponent } from "./pages/home/home.component";
import { EthicsComponent } from "./pages/ethics/ethics.component";
import { RulesComponent } from "./pages/rules/rules.component";
import { GameComponent } from "./pages/game/game.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "videoscreen/:url", component: VideoComponent },
    //{ path: "home", redirectTo: "/tabs", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "ethics", component: EthicsComponent },
    { path: "rules", component: RulesComponent },
    { path: "game", component: GameComponent },
    { path: "settings", component: SettingsComponent },
    { path: "tabs", loadChildren: "./tabs/tabs.module#TabsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
