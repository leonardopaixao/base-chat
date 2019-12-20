import { Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-marker',
	templateUrl: './marker.component.html',
	styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit, AfterViewInit {
	@ViewChild('marker') marker: any;

	@Output() emitter : EventEmitter<string> = new EventEmitter();

	public usersList : Array<any>;
	public taggedUser: string = '';

	constructor( private chatService: ChatService, private authService: AuthService ) {
		chatService.getParticipants().then(
			element => {
				authService.authUser().subscribe(
					ref => {
						this.usersList = new Array();
						element.forEach( e => {
							if( e.val()['email'] !== ref.email){
								this.usersList.push( e.val() );
							}
					} );
				}
			);		
		});
	}

	ngAfterViewInit(){
		this.marker.nativeElement.focus();
	}

	public userSelected( data ): void{
		
		(<HTMLInputElement>document.getElementById("chatFormInput")).setRangeText(data.userName+' ');
		this.taggedUser = data.email;
		// this._bottomSheetRef.dismiss();
		// event.preventDefault();
	}
	
	ngOnInit() { }
}