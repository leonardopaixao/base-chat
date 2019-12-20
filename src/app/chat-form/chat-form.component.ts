import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnChanges, OnInit {

	@Input() channelKey : string;

	public message		: string;
	public marker 		: boolean = false;
	public userList1 	: any;
	public userData 	: any[] = [];
	public lastkeydown1 : number = 0;
	public subscription	: any;

	public chatService: any;


	public backupMessage: string = '';
	public choosenData : string = '';
	public autocompleteClosed : boolean = true;
	public storeMessage = true;

	public markerTrigger:string = 'no';

	// auto-complete
	myControl = new FormControl();
	options: string[] = ['One', 'Two', 'Three'];
	filteredOptions: Observable<string[]>;
	allUsers: Array<string> = new Array();
	taggedUsers: Array<string> = new Array();

	constructor( private chat: ChatService, private previewDialog: OverlayService ) {
		this.chatService = chat;
	}

	ngOnInit(){
		this.chatService.getUsers().valueChanges().pipe().subscribe(
			ref => {
				if( ref ){
					this.chat.getUser().valueChanges().subscribe( val => {
						if(val){
							ref.forEach( e => {
								if( e['email'] != val['email'] ){
									if( !this.allUsers.includes( e['userName'] ) )
										this.allUsers.push( e['userName'] );
								}
							});
						}
					} )
					// console.log( ref );
					// Object.assign( this.userData, ref );
				}
			}
		);
	}

	ngOnChanges() {
		
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);

		this.myControl.statusChanges.subscribe(ref => {
			console.log(ref);
		});

		// this.filteredOptions.subscribe(
		// 	ref => {
		// 		console.log(ref);
		// 	}
		// );
	}

	// private _filter(value: string): string[] {
	// 	const filterValue = value.toLowerCase();
	// 	console.log(value, filterValue);
	// 	if (value[0] === '@') {
	// 	  const valueWithoutAt = value.substring(1, value.length - 1);
	// 	  console.log('value', valueWithoutAt);
	// 	  return this.options.filter(option => option.toLowerCase().includes(valueWithoutAt));
	// 	}
	// 	return [''];
	//   }

	public getPosts(data){
		this.autocompleteClosed = false;
		this.choosenData = data;
		this.taggedUsers.push(data);
	}

	public closed(){
		this.autocompleteClosed = true;
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.options.filter(option => option.toLowerCase().includes(filterValue));
	}

	// public send(){
	// 	var inputValue = (<HTMLInputElement>document.getElementById("chatFormInput")).value;
	// 	if( this.channelKey == undefined )
	// 		this.channelKey = "-LnUqMAYvH2hAE9WA_iC";
		
	// 	this.chat.sendMessage(inputValue, this.channelKey, this.taggedUsers, '');
	// 	this.message = '';
	// 	this.taggedUsers = new Array();
	// 	inputValue = '';
	// }

	public send(){
		if( this.channelKey == undefined )
			this.channelKey = "-LnUqMAYvH2hAE9WA_iC";

		var inputMessage = (<HTMLInputElement>document.getElementById("chatFormInput")).value;
		let x = inputMessage.split(" ");
		let regexpTagger = new RegExp('^@[a-z]+\.[a-z]{2,4}$');

		this.taggedUsers = new Array();
		this.chatService.getUsers().valueChanges().pipe().subscribe(
			ref => {
				if( ref ){
					ref.forEach( e => {
						x.forEach( item => {
							if( regexpTagger.test(item) ){
								var tagged = item.replace( /@/, "" );				

								if( e['userName'] === tagged ){
									console.log('entrou!');
		
									console.log( e['userName'] );
									console.log( tagged );
									this.taggedUsers.push( e['email'] );
								}
							}
						})
					});
					this.chat.sendMessage(inputMessage, this.channelKey, this.taggedUsers, '');
				}
			}
		);
		this.message = '';
		this.taggedUsers = new Array();
	}

	public handleSubmit(event){
		this.markerTrigger = 'no';
		if( event.keyCode === 50 ){ //@
			// this.storeMessage = false;
			console.log( event.key );
			this.previewDialog.open();
			this.markerTrigger = 'yes'; 
		}


		if ( event.keyCode === 13 ){
			if( this.storeMessage ){
				this.send();
			}this.storeMessage = true;
		}
	}
}