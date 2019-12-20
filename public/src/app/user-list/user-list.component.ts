import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges{

	@Input() data : any;
	@Output() emitter : EventEmitter<string> = new EventEmitter();

	public users       : User[];
	public channels    : any;
	public chatService : ChatService;
	public general 	   : any;
	public observable  : Observable<any>;

	public temp : any;

	constructor(private chat: ChatService){
		this.chatService = chat;
	}
	
	ngOnInit(){
		
		this.chatService.getUsers().valueChanges().subscribe(
			(users:any) => {
				this.users = users;
			}
		);

		this.chatService.getPublicChannel().then(
			ref => {
				this.general = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}))[0];
			}
		);

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

		this.chatService.getPrivateChannelsInfo().subscribe(
			ref => {
				this.observable = ref;

				if( this.observable ){
					this.updateChannels();
				}

				this.temp = new Array();
				this.observable.forEach( item => {
					if( item['status'] === 'open' && item['type'] === 'private' ){
						this.temp.push( item );
					}
				});
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
}