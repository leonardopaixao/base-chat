import { Observable } from 'rxjs';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { Channel } from '../models/channel.model';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

	@Input() data : any;
	@Output() emitter : EventEmitter<string> = new EventEmitter();

	private user 	   : Observable<firebase.User>
	public users       : User[];
	public channels    : Array<any>;
	public chatService : ChatService;
	public general 	   : any;
	public observable  : Observable<any>;
	public _user 	   : any;
	public authService : AuthService;
	public userEmail   : string;

	constructor(private chat: ChatService, private auth: AuthService, public dialog: MatDialog){
		this.chatService = chat;
		this.authService = auth;
		
		this.chatService.getUsers().valueChanges().pipe().subscribe(
			(users:any) => {
				this.users = users;
			}
		);
	}
	
	ngOnInit(){
		this.chatService.retrieveAllChannels().subscribe( 
			ref => {
				if( ref ){
					this.channels = new Array();
					this.authService.authUser().subscribe(
						u => {
							if(u){
								ref.forEach( item => {	
									if( item['status'] == 'open' ){
										if( item['type'] == 'private' ){
											if( item['owner'] && item['guests'] ){
												if( item['owner'] == u.email || item['guests'].indexOf(u.email) > -1 ){
													this.channels.push(item);
												}
											}
										}else if( item['type'] == 'public' ){
											this.general = item;
										}
									}
								})
							}
					});
				}
			}
		);
	}

	public updateChannels(){
		this.chatService.getPrivateChannels().then(
			ref => {
				const mapped = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));

				this.channels = new Array();
				mapped.forEach( e => {
					if( e.value['status'] === 'open' ){
						this.channels.push(e);
					}
				});
			}
		);
	}

	public getChannelMessages(channelKey){
		this.emitter.emit(channelKey);
	}

	public getChildData(data){
	}

	public openDialog(): void{
		const dialogRef = this.dialog.open( ChannelDialogComponent, {
			data: {
				guests: '',
				title: '',
				channelKey: ''
			}
		} );
		// const dialogRef = this.dialog.open(ChannelDialogComponent, {
		// 	data: {
		// 		guests: '',
		// 		title: '',
		// 		channelKey: ''
		// 	}
		// });

		// dialogRef.afterClosed().subscribe(result => {
		// 	console.log('The dialog was closed');
		// 	this.animal = result;
		// });

		console.log( 'open private channel!' );
	}
}