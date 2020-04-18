import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../_services/users.service";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {
    }

    onSubmit(signUpForm: NgForm) {
        this.usersService.signupUser(signUpForm.value.login,signUpForm.value.password,signUpForm.value.name,signUpForm.value.birthday).
        subscribe();
    }
}
