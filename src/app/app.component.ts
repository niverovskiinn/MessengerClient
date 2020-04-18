import {Component} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'MessengerClient';
    loggedStat: boolean;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(us => this.loggedStat=!!us);
    }


}
