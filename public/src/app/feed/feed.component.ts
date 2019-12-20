import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

	@Input() channelKey : string;

	// This might be a generic component
	// I mean, this can be the same feed
	// component for different channels.

	public feed 			 : Array<any>;
	public observable 		 : Observable<any>;
	public channel   		 : Observable<any>;
	public userEmail 		 : string;
	public isGeneral 		 : boolean = true;
	public channelMessages   : any;
	public generalChannelKey : string;

	constructor(private chat: ChatService, private auth: AuthService) {
		auth.authUser().pipe().subscribe(ref => {
			this.userEmail = ref.email;
		});
		this.generalChannelKey = "-LnUqMAYvH2hAE9WA_iC";
	}

	ngOnInit() {
		// if( typeof this.channelKey !== 'undefined' ){
		// 	this.isGeneral = false;
		// 	this.feed = new Array();
		// 	this.chat.getChannelMessages(this.channelKey).then(ref => {
		// 		const mapped = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
		// 		this.feed = Array.of(mapped);
		// 	});
		// }else{
		// 	this.chat.getChannelMessages(this.channelKey).then(ref => {
		// 		const mapped = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
		// 		this.feed = Array.of(mapped);
		// 	});
		// }
	}

	ngOnChanges() {
		
		// this.chat.getMessages().subscribe(
		// 	ref => {
		// 		this.temp = ref;
		// 	}
		// );
		this.chat.getMessages().subscribe(
			ref => {
				this.observable = ref;

				this.feed = new Array();
				this.observable.forEach(e => {
					if( e.channel === this.channelKey ){
						this.feed.push(e);
					}
				});
			}
		);


		// if( typeof this.channelKey !== 'undefined' ){
		// 	this.isGeneral = false;
		// 	this.feed = new Array();
		// 	this.chat.getChannelMessages(this.channelKey).then(ref => {
		// 		const mapped = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
		// 		this.feed = Array.of(mapped);
		// 	});
		// }else{
		// 	this.chat.getChannelMessages(this.channelKey).then(ref => {
		// 		const mapped = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
		// 		this.feed = Array.of(mapped);
		// 	});
		// }
	}
}