import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

export interface DialogData{
  guests	 : Array<string>,
  title		 : string,
  channelKey : string
}

@Component({
  selector: 'app-channel-dialog',
  templateUrl: './channel-dialog.component.html',
  styleUrls: ['./channel-dialog.component.css']
})
export class ChannelDialogComponent implements OnInit {

	public participants 	: Array<any>;
	private item 		 	: string;
	private selected	 	: Array<string> = new Array();
	public channelName  	: any;
	private _data		 	: any;
	private checked 	 	: boolean = false;
	private participantData : any;
	private channelKey		: string;

	constructor(public dialogRef: MatDialogRef<ChannelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,	private chatService: ChatService, private authService: AuthService){
		this.channelKey = data.channelKey;

		chatService.getParticipants().then(
			element => {
				authService.authUser().subscribe(
					ref => {
						this.participants = new Array();
						element.forEach( e => {
							this.checked = false;
							this.participantData = {
								name: '',
								checked: false,
								email: ''
							}
							if(e){
								if( e.val()['email'] !== ref.email){
									this.participantData = {
										name: e.val()['firstName'] + ' ' + e.val()['lastName'],
										checked: false,
										email: e.val()['email']
									}
									if( data.guests.indexOf(e.val()['email']) > -1 ){
										this.selected.push( e.val()['email'] );
										this.participantData = {
											name: e.val()['firstName'] + ' ' + e.val()['lastName'],
											checked: true,
											email: e.val()['email']
										}
									}
									this.participants.push(this.participantData);
								}
							}
						} );
					}
				);		
			}
		);

		this._data = data;
	}

	ngOnInit(){}

	onNoClick(): void {
		this.dialogRef.close();
	}

	toggle(event){
		if( event.checked ){
			this.selected.push(this.item);
		}else{
			const index = this.selected.indexOf(this.item);
			if( index > -1 ){
				this.selected.splice( index, 1 );
			}
		}
	}

	info(participant){
		this.item = participant.email;
	}

	openChannel(){
		if( !this.channelKey ){
			this.chatService.openChannel( this.selected, this.channelName );
		}else{
			this.chatService.updateChannel( this.channelKey, this.selected, this.channelName );
			console.log( 'Channel ' + this.channelKey + ' is up to date.' )
		}
		this.dialogRef.close();
	}

	close(){
		this.dialogRef.close();
	}

}
