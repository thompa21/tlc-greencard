import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { HttpGetService } from "../../shared/HttpGetService/http-get.service";
import * as applicationSettingsModule from "application-settings";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [HttpGetService]
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private myGetService: HttpGetService,
    ) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    public username = "";

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
       //Hämta information från token
       this.myGetService.getuser()
       .subscribe(
           (result) => {
               console.dir(result);
               this.username = "Välkommen " + result.data.userName
               /*
               this.myGetService.getAlmaUser(applicationSettingsModule.getString('alma_primaryid'))
                   .subscribe((result) => {
                       
                   }, (error) => {
                       
                   });*/
           }, 
           (error) => {
               console.log(error);
           });

    }
    
}
