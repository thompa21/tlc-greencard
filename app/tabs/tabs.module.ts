import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeComponent } from "./home/home.component";
import { EthicsComponent } from "./ethics/ethics.component";
import { RulesComponent } from "./rules/rules.component";
import { GameComponent } from "./game/game.component";
import { SettingsComponent } from "./settings/settings.component";

import { TabsRoutingModule } from "./tabs-routing.module";

import { TabsComponent } from "./tabs.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        EthicsComponent,
        RulesComponent,
        GameComponent,
        SettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
