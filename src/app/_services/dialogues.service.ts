import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {Dialogue} from "../_models/dialogue";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {UsersService} from "./users.service";

@Injectable({
    providedIn: 'root'
})
export class DialoguesService {
    dialUrl = `${environment.apiUrl}/dialogues/`;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private usersService: UsersService, private authenticationService: AuthenticationService, private http: HttpClient) {
    }

    /* POST: create a new dialogue */
    createDialogue(idPartner: number): Observable<any> {
        let crDialogInfo = {
            Token: this.authenticationService.currentUserValue.token,
            Id: this.authenticationService.currentUserValue.id,
            IdUser: idPartner
        };
        return this.http.post(this.dialUrl + 'create', crDialogInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('createDialogue'))
        );
    }

    /* POST: delete the dialogue */
    deleteDialogue(idDial: number): Observable<any> {
        let delDialogInfo = {
            Token: this.authenticationService.currentUserValue.token,
            Id: this.authenticationService.currentUserValue.id,
            IdDial: idDial
        };
        return this.http.post(this.dialUrl + 'remove', delDialogInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('deleteDialogue'))
        );
    }

    /* GET user's dialogues */
    getDialogues(): Observable<Dialogue[]> {
        const url = `${this.dialUrl}?id=${this.authenticationService.currentUserValue.id}&token=${this.authenticationService.currentUserValue.token}`;
        return this.http.get<Dialogue[]>(url).pipe(
            catchError(this.handleError<Dialogue[]>(`getDialogues ${url}`))
        );

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            return of(result as T);
        };
    }
}
