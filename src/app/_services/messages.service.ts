import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";
import {Dialogue} from "../_models/dialogue";
import {Message} from "../_models/message";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    messUrl = `${environment.apiUrl}/messages/`;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private authenticationService:AuthenticationService,private http: HttpClient) {
    }

    /* POST: send a message */
    sendMessage(idDial: number, data:string): Observable<any> {
        let sndMsgInfo = {
            Token: this.authenticationService.currentUserValue.token,
            Id: this.authenticationService.currentUserValue.id,
            IdDial: idDial,
            Data: data
        };
        console.log(sndMsgInfo)
        return this.http.post(this.messUrl + 'send', sndMsgInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('sendMessage'))
        );
    }

    /* POST: remove message */
    removeMessage(idMess: number): Observable<any> {
        let rmvMsgInfo = {
            Token: this.authenticationService.currentUserValue.token,
            Id: this.authenticationService.currentUserValue.id,
            IdMess: idMess
        };
        return this.http.post(this.messUrl + 'remove', rmvMsgInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('removeMessage'))
        );
    }

    /* POST: remove message */
    editMessage(idMess: number, data:string): Observable<any> {
        let edtMsgInfo = {
            Token: this.authenticationService.currentUserValue.token,
            Id: this.authenticationService.currentUserValue.id,
            IdMess: idMess,
            Data: data
        };
        return this.http.post(this.messUrl + 'edit', edtMsgInfo, this.httpOptions).pipe(
            catchError(this.handleError<any>('editMessage'))
        );
    }

    /* GET dial's messages  */
    getMessages(idDial:number): Observable<Message[]> {
        const url = `${this.messUrl}dial?id=${this.authenticationService.currentUserValue.id}&token=${this.authenticationService.currentUserValue.token}&idDial=${idDial}`;
        return this.http.get<Message[]>(url).pipe(
            catchError(this.handleError<Message[]>(`getMessages ${url}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            return of(result as T);
        };
    }


}
