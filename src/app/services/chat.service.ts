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
					if(a){
						this.username = a.userName
					}
				}
			);

		});
	}

	public getUser(){
		const userId = this.user.uid;
		const path = `/users/${userId}`;

		return this.db.object(path);
	}

	public getParticipants(){
		return this.db.database.ref('/users').once('value');
	}

	public getUsers(){
		return this.db.list('/users');
	}

	public sendMessage(msg: string, channel: string, taggedUsers: Array<string>, replier: string): void{
		const data = {
			taggedUsers	: taggedUsers,
			message	 	: msg,
			timeSent 	: this.getTimeStamp(),
			username 	: this.username,
			email	 	: this.user.email,
			channel	 	: channel,
			reply		: replier
		}
		
		const key = this.db.list(this.basePath).push(data).key;
		const updated = {id: key}
		this.db.object('/messages/' + key).update( updated ).catch( error => console.log( error ) );
	}

	public getMessage( id ){
		return this.db.list('/messages/' + id).valueChanges().pipe();
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

	public retrieveAllChannels(){
		return this.db.list('/channels').valueChanges().pipe();
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

	public openChannel(guests, channelName){
		const data = {
			owner  : this.user.email,
			guests : guests,
			time   : this.getTimeStamp(),
			status : 'open',
			type   : 'private',
			title  : channelName
		}

		const key = this.db.database.ref('/channels').push(data).key;
		const updated = {id: key}
		this.db.object('/channels/' + key).update(updated).catch(error => console.log(error));
		return key;
	}

	public updateChannel( channelKey, guests, channelName ){
		const data = {
			guests : guests,
			title  : channelName
		}
		this.db.object('/channels/' + channelKey).update(data).catch(error => console.log(error));
		return channelKey;
	}

	public getChannelMessages(channelKey: string){
		return this.db.database.ref('/messages').orderByChild('channel').equalTo(channelKey).once('value');
	}

	public closeChannel(channelKey: string){
		return this.db.object('/channels/' + channelKey).update({status : 'closed'}).catch(error => console.log(error));
	}
}