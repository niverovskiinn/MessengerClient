import {Component, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {UsersService} from "../_services/users.service";
import {AuthenticationService} from "../_services/authentication.service";
import {DialoguesService} from "../_services/dialogues.service";
import {MessagesService} from "../_services/messages.service";
import {Dialogue} from "../_models/dialogue";
import {Message} from "../_models/message";
import {interval, Subscription} from "rxjs";
import {flatMap} from "rxjs/operators";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    logged: User;
    activeDial: number;
    dialogues: Dialogue[];
    messages: Message[];
    messageArea: string;
    messSub: Subscription;
    constructor(private usersService: UsersService,
                private dialogService: DialoguesService,
                private messageService: MessagesService,
                private authenticationService: AuthenticationService) {

    }



    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(us => this.logged = us);
        this.getDialogues()
    }

    getUsers() {
        if (this.logged)
            this.dialogues.map(dial => {
                this.usersService.getByIdUser(dial.userIdFirst == this.logged.id ? dial.userIdSecond : dial.userIdFirst).subscribe(u => dial.userName = u.name);
            })
    }

    getDialogues(): void {
        if (this.logged)
            this.dialogService.getDialogues().subscribe(dial => {
                console.log(dial)
                this.dialogues = dial;
                this.getUsers();
            })
    }

    getMessages(idDial: number) {
        this.activeDial = idDial;
        this.messageService.getMessages(idDial).subscribe(mes => this.messages = mes);
        if (this.messSub)
            this.messSub.unsubscribe();
        this.messSub = interval(2*1000).pipe(
            flatMap(() => this.messageService.getMessages(idDial))
        )
            .subscribe(mes => this.messages = mes)
    }


    sendMessage() {
        this.messageArea = this.messageArea.trim();
        if (this.messageArea != '') {
            this.messageService.sendMessage(this.activeDial, this.messageArea).subscribe();
            this.messageArea = ''
        }
    }
}
