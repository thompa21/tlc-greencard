import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login.component";
import { VideoComponent } from "./video.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "videoscreen", component: VideoComponent },
    { path: "home", redirectTo: "/tabs", pathMatch: "full" },
    { path: "tabs", loadChildren: "./tabs/tabs.module#TabsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
