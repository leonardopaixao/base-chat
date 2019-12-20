import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {

	@ViewChild('scroller') private feedContainer: ElementRef;

	public channelKey : string = '-LnUqMAYvH2hAE9WA_iC';

	constructor() {	}

	ngOnInit() { }

	public scrollToBottom(): void{
		this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
	}

	ngAfterViewChecked(){
		return this.scrollToBottom();
	}

	public getChildData(data){
		this.channelKey = data;
	}

	public getMarkerData(data){
		console.log( 'emitter works!' + data );
	}
}
