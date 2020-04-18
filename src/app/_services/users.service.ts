import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../_models/user';
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private authenticationService:AuthenticationService,private http: HttpClient) {
    }

    usersUrl = `${environment.apiUrl}/users/`;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    /* POST: signup a new user */
    signupUser(login: string, password: string, name: string, birthday: Date): Observable<any> {
        let userInfo = {
            Login: login,
            Name: name,
            Password: password,
            Birthday: birthday
        };
        return this.http.post(this.usersUrl + 'signup', userInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('signUpUser'))
        );
    }

    /* GET users whose name contains search term */
    searchUser(term: string): Observable<User[]> {
        if (!term.trim()) {
            return of([]);
        }
        const url = `${this.usersUrl}search?id=${this.authenticationService.currentUserValue.id}&token=${this.authenticationService.currentUserValue.token}&data=${term}`;
        return this.http.get<User[]>(url).pipe(
            catchError(this.handleError<User[]>(`searchUser id=${this.authenticationService.currentUserValue.id} token=${this.authenticationService.currentUserValue.token} data=${term}`))
        );
    }

    /* GET user name by id */
    getByIdUser(id: number): Observable<User> {
        const url = `${this.usersUrl}get?id=${this.authenticationService.currentUserValue.id}&token=${this.authenticationService.currentUserValue.token}&idAn=${id}`;
        return this.http.get<User>(url).pipe(
            catchError(this.handleError<User>(`getByIdUserName ${url}`))
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            return of(result as T);
        };
    }

}
