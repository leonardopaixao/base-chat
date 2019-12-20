import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel } from '../models/channel.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.css']
})
export class ChannelItemComponent implements OnInit {

	@Input() channel : any;
	@Output() output = new EventEmitter();

	public owner 	     : User;
	public guest 	     : User;
	public userService   : UserService;
	public channel_title : string;

	constructor( private service: UserService ) {
		this.userService = service;
		this.channel_title = 'general';
	}
	
	ngOnInit(){
		if( typeof this.channel !== 'undefined' ){
			if( this.channel.value['type'] === 'private' ){
				this.channel_title = '';
				// owner
				this.userService.findByEmail( this.channel.value['owner'] ).then(
					ref => {
						const data = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
						this.channel_title = this.channel_title.concat( data[0].value['displayName'] );
					}
				);

				// guest
				this.userService.findByEmail( this.channel.value['guest'] ).then(
					ref => {
						const data = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
						this.channel_title = this.channel_title.concat(data[0].value['displayName'] + ' ')
					}
				);
			}
		}
	}

	public getChannelMessages(channel){
		this.output.emit(channel.key);
	}
}