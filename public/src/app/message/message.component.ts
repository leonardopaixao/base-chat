import { Component, OnInit, Input } from '@angular/core';
import { ChatService              } from '../services/chat.service';
import { AuthService              } from '../services/auth.service';
import { ChatMessage              } from '../models/chat-message.model';

@Component({
  selector    : 'app-message',
  templateUrl : './message.component.html',
  styleUrls   : ['./message.component.css']
})

export class MessageComponent implements OnInit{

  	@Input() chatMessageObject: any;

	public userEmail      : string;
	public username       : string;
	public messageContent : string;
	public timeStamp      : string;
	public isOwnMessage   : boolean;
	public ownEmail       : string;

	constructor(private authService: AuthService){
		authService.authUser().subscribe(
			user => {
				this.ownEmail = user.email;
				this.isOwnMessage = this.ownEmail === this.userEmail;
			}
		)
	}

	ngOnInit() {
		if( typeof this.chatMessageObject !== 'undefined' ){
			this.messageContent = this.chatMessageObject['message'];
			this.userEmail = this.chatMessageObject['email'];
			this.username = this.chatMessageObject['username'];
			this.timeStamp = this.chatMessageObject['timeSent'];
		}
	}
}