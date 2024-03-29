import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList   	 } from 'angularfire2/database';
import { AngularFireAuth 	 } from 'angularfire2/auth';
import { Observable 		 } from 'rxjs';
import { ChatMessage 		 } from '../models/chat-message.model';
import { AuthService 		 } from '../services/auth.service';
import { Injectable 		 } from '@angular/core';
import { map 				 } from 'rxjs/operators';
import { Channel } from '../models/channel.model';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public chatMessagesList	: AngularFireList<any> = null;
	public channelList		: AngularFireList<any> = null;
	public channelMessages	: AngularFireList<any> = null;
	public chatMessage		: ChatMessage;
	public user				: firebase.User;
	public username			: Observable<string>;
	private basePath 		: string = '/messages';
	private channels 		: Array<Channel>;

	private temp_ : any;

	constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth ) {
		this.afAuth.authState.subscribe(auth => {
			if( auth !== undefined && auth !== null ){
				this.user = auth;
			}

			this.getUser().valueChanges().subscribe(
				(a:any) => {
					this.username = a.displayName
				}
			);

		});
	}

	public getUser(){
		const userId = this.user.uid;
		const path = `/users/${userId}`;

		return this.db.object(path);
	}

	public getUsers(){
		return this.db.list('/users');
	}

	public sendMessage(msg: string, channel: string): void{
		this.chatMessagesList = this.db.list(this.basePath);
		this.chatMessagesList.push({
				message	 : msg,
				timeSent : this.getTimeStamp(),
				username : this.username,
				email	 : this.user.email,
				channel	 : channel
			}
		);
	}



	public getMessages(): any{
		
		return this.db.list('/messages').valueChanges().pipe();

		// this.db.list(this.basePath).snapshotChanges().pipe(
		// 	map( changes => {
		// 		const data = changes.map( c => ({ key: c.payload.key, ...c.payload.val() }));
		// 		console.log(data);
		// 	} )
		// );

		// return this.db.database.ref(this.basePath);
	}

	public getPublicChannel(){
		return this.db.database.ref('/channels').orderByChild('type').equalTo('public').once('value');
	}

	public getPrivateChannelsInfo(){
		return this.db.list('/channels').valueChanges().pipe();
	}

	public getPrivateChannels(){
		return this.db.database.ref('/channels').orderByChild('type').equalTo('private').once('value');
	}

	public getChannels():any{
		// return this.db.list('/channels').snapshotChanges().pipe(
		// 	map( changes => {
		// 		return changes.map( c => ({ key: c.payload.key, ...c.payload.val() }));
		// 	} )
		// );

		return this.db.database.ref('/channels');

		// const data = this.db.database.app.firestore().collection('/channels').get().then(
		// 	ref => {
		// 		ref.docs.map( doc => {
		// 			return {
		// 				...doc.data(),
		// 				id: doc.id
		// 			  };
		// 		} )
		// 	}
		// );

		// return data;
		
		// return this.db.list('/channels');
	}

	public getTimeStamp(){
		const now  = new Date();
		const date = now.getUTCDate() + '.' +  ( now.getUTCMonth() + 1 ) + '.' + now.getUTCFullYear(); 
		const time = now.getUTCHours() + ':' + now.getUTCMinutes();
					
		return time;
	}

	public openChannel(guest){

		const data = {
			owner  : this.user.email,
			guest  : guest,
			time   : this.getTimeStamp(),
			status : 'open',
			type   : 'private'
		}
		return this.db.database.ref('/channels').push(data).key;
	}

	public getChannelMessages(channelKey: string){
		return this.db.database.ref('/messages').orderByChild('channel').equalTo(channelKey).once('value');
	}
}