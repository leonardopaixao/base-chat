import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Channel } from '../models/channel.model';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.css']
})
export class ChannelItemComponent implements OnInit, OnChanges {

	@Input() channel : any;
	@Output() output = new EventEmitter();

	public owner 	     : User;
	public guest 	     : User;
	public userService   : UserService;
	public chatService	 : ChatService;
	public channel_title : string;
	public generalKey 	 : string = '-LnUqMAYvH2hAE9WA_iC';
	public notGeneral	 : boolean;

	constructor( private service: UserService, private cs: ChatService, public dialog: MatDialog ) {
		this.userService   = service;
		this.channel_title = 'general';
		this.chatService   = cs;
		this.notGeneral    = true;
	}
	
	ngOnInit(){	}
	
	ngOnChanges(){
		if( this.channel ){
			this.channel_title = this.channel['title'];
			if( this.channel.id == this.generalKey )
				this.notGeneral = false;
		}
	}

	public getChannelMessages(channel){
		this.output.emit(channel.id);
	}

	public closeChannel(channel){
		console.log( this.chatService.closeChannel( channel.id ) );
	}

	public editChannel(channel){
		const dialogRef = this.dialog.open(ChannelDialogComponent, {
			data: {
				guests: channel.guests,
				title: channel.title,
				channelKey: channel.id
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}