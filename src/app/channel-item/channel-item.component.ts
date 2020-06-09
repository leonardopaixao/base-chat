import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Channel } from '../models/channel.model';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';
import { AuthService } from '../services/auth.service';

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
	public authservice 	 : AuthService;
	public channelOwner  : boolean;

	constructor( private service: UserService, private cs: ChatService, public dialog: MatDialog, private authService: AuthService ) {
		this.userService   = service;
		this.channel_title = 'general';
		this.chatService   = cs;
		this.notGeneral    = true;
		this.authservice   = authService;
		this.channelOwner  = false;
	}
	
	ngOnInit(){	}
	
	ngOnChanges(){
		if( this.channel ){
			this.channel_title = this.channel['title'];
			if( this.channel.id == this.generalKey )
				this.notGeneral = false;
			
			this.authservice.authUser().subscribe(
				ref => {
					if( ref ){
						if( ref.email == this.channel['owner'] ){
							this.channelOwner = true;
						}
					}
				}
			);
		}
	}

	public getChannelMessages(channel){
		this.output.emit(channel.id);
	}

	public closeChannel(channel){
		
		if( this.channelOwner )
			this.chatService.closeChannel( channel.id );
		else{
			const guests = channel.guests;
			this.authService.authUser().subscribe( e => {
				if( e ){
					const index = guests.indexOf( e.email );

					if( index > -1 ){
						guests.splice( index, 1 );
						
						//update the session with the new guests.
						this.chatService.updateChannel( channel.id, guests, channel.title );
					}
				}
			});
		}

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