import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {UsersService} from "../_services/users.service";
import {debounceTime, distinctUntilChanged, first, map, switchAll, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Dialogue} from "../_models/dialogue";
import {DialoguesService} from "../_services/dialogues.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    logged: User;
    searchArea: string = '';


    constructor(private router:Router, private dialoguesService:DialoguesService, private usersService:UsersService, private authenticationService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(us => this.logged=us);
    }

    formatter = (userNewDial: User) => userNewDial.name;
    search = (text: Observable<string>) =>
        text.pipe(
            debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.usersService.searchUser(term))
        );



    signOut() {
        this.authenticationService.signoutUser()
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['']);
                },
                error => {
                    alert(error);
                });
    }

    createDialogue() {
       this.dialoguesService.createDialogue(this.searchArea['id']).subscribe()
    }
}
