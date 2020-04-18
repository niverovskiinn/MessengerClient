import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../_models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    usersUrl = `${environment.apiUrl}/users/`;
    httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /* POST: signin a user */
    signinUser(login: string, password: string): Observable<User> {
        let userInfo = {
            Login: login,
            Password: password
        };
        return this.http.post<User>(this.usersUrl + 'signin', JSON.stringify(userInfo), this.httpOptions).pipe(
            map(data => {
                if (data.login) {
                    let user: User = data;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                } else {
                    alert(data)
                }
            }),
            catchError(this.handleError<User>('signInUser'))
        );
    }


    /* POST: signout a user */
    signoutUser(): Observable<User> {
        let userInfo = {
            Id: this.currentUserValue.id,
            Token: this.currentUserValue.token
        };
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.post<User>(this.usersUrl + 'signout', userInfo, this.httpOptions).pipe(
            catchError(this.handleError<User>('signOutUser'))
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            return of(result as T);
        };
    }
}
