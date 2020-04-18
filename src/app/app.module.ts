import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {FormsModule} from '@angular/forms';
import {UsersService} from './_services/users.service';
import {CookieService} from 'ngx-cookie-service';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuard} from "./_helpers/auth.guard";
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const appRoutes: Routes = [
    {path: '', component: SignInComponent},
    {path: 'registration', component: AuthorizationComponent},
    {path: 'main', component: MainComponent, canActivate : [AuthGuard]},
    {path: '**', redirectTo: ''}
    ];

@NgModule({
    declarations: [
        AppComponent,
        AuthorizationComponent,
        MainComponent,
        HeaderComponent,
        SignInComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        AppRoutingModule,
        FormsModule,
        NgbModule
    ],
    providers: [UsersService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
