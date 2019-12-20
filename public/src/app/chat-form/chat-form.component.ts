import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

	@Input() channelKey : string;
	public message: string;

	constructor(private chat: ChatService) { }

	ngOnInit() { }

	public send(){
		if( this.channelKey == undefined )
			this.channelKey = "-LnUqMAYvH2hAE9WA_iC";
		
		this.chat.sendMessage(this.message, this.channelKey);
		this.message = '';
	}

	public handleSubmit(event){
		if ( event.keyCode === 13 ) //enter key
			this.send();
	}
}