import { Component, OnInit, Input } from '@angular/core';
import { ChatService              } from '../services/chat.service';
import { AuthService              } from '../services/auth.service';
import { ChatMessage              } from '../models/chat-message.model';
import { ReplierComponent } from '../replier/replier.component';
import { MatDialog } from '@angular/material';

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
	public replyOn : boolean = false;
	public repliedMsg:any;

	// matDialog
	name: string = 'leo';
	animal: string = 'julinha';
	channelKey = "-LnUqMAYvH2hAE9WA_iC";

	constructor(private authService: AuthService, public dialog: MatDialog, public chatService: ChatService){
		authService.authUser().subscribe(
			user => {
				if( user ){
					this.ownEmail = user.email;
					this.isOwnMessage = this.ownEmail === this.userEmail;
				}
			}
		)
	}

	ngOnInit() {
		if( typeof this.chatMessageObject !== 'undefined' ){
			this.messageContent = this.chatMessageObject['message'];
			this.userEmail = this.chatMessageObject['email'];
			this.username = this.chatMessageObject['username'];
			this.timeStamp = this.chatMessageObject['timeSent'];

			if( this.chatMessageObject['reply'] ){
				if( this.chatMessageObject['reply'] !== '' ){
					this.replyOn = true;
					const repliedMsgID = this.chatMessageObject['reply'];
					this.chatService.getMessage( repliedMsgID ).subscribe( ref => {
						if( ref ){
							this.repliedMsg = ref[3];
						}
					} );

				}
			}
		}
	}

	replyMessage( messageContent ){
		console.log( this.chatMessageObject );
		const dialogRef = this.dialog.open(ReplierComponent, {
			width: '600px',
			height: '400px',
			data: { message: messageContent }
		  });

		  
	  
		  dialogRef.afterClosed().subscribe( result => {
			  
			if( result !== undefined ){
				console.log(`Dialog result: ${result}`);
				this.chatService.sendMessage( result, this.channelKey, [], this.chatMessageObject['id'] );
			}
		  });
	}
}