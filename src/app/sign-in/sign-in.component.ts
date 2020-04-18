import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    error = '';
    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    onSubmit(signInForm: NgForm) {
        if(signInForm.invalid)
            return;

        this.authenticationService.signinUser(signInForm.value.login, signInForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                        this.router.navigate(['main']);
                },
                error => {
                    this.error = error;
                });
    }
}
