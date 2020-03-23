import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

	@Input() user : User;
	@Output() emitter : EventEmitter<string> = new EventEmitter();

	public chatService : ChatService;
	public newMessage  : boolean;

	animal: string;
	name: string;

	constructor(chatService: ChatService, public dialog: MatDialog) {
		this.chatService = chatService;
		this.newMessage = false;
	}

	public openDialog():void{
		const dialogRef = this.dialog.open(ChannelDialogComponent, {
			data: {
				guests: '',
				title: '',
				channelKey: ''
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.animal = result;
		});
	}

	public openChannel(data){
		const newChannelKey = this.chatService.openChannel(data, '');
		this.emitter.emit(newChannelKey);
	}

	public openPrivateChannel( guest ){
		// first we need to check if there is a channel created
		const logged = this.chatService.getUserEmail();

		const id_1 = guest.email.replace(".", "") + '_' + logged.replace(".", "");
		const id_2 = logged.replace(".", "") + '_' + guest.email.replace(".", "");

		this.chatService.findPrivateChannel().child(id_1).once('value').then(
			ref => {
				if( ref ){
					if( ref.val() ){
						// this room already exists
						this.emitter.emit( ref.val().id );
					}else{
						this.chatService.findPrivateChannel().child(id_2).once('value').then(
							ref2 => {
								if( ref2 ){
									if( ref2.val() ){
										// this room already exists
										this.emitter.emit( ref2.val().id );
									}else{
										//create new prvate room
										const newChannelKey = this.chatService.openPrivateChannel(guest);
										this.emitter.emit(newChannelKey);
									}
								}
							}
						);
					}
				}
			}
		);	
	}

	ngOnInit() {}
}