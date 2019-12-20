import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

	@Input() user : User;
	@Output() emitter : EventEmitter<string> = new EventEmitter();

	public chatService : ChatService;

	animal: string;
	name: string;

	constructor(chatService: ChatService, public dialog: MatDialog) {
		this.chatService = chatService;
	}

	public openDialog():void{
		const dialogRef = this.dialog.open(ChannelDialogComponent, {
			data: {
				guests: '',
				title: '',
				channelKey: ''
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.animal = result;
		});
	}

	public openChannel(data){
		const newChannelKey = this.chatService.openChannel(data, '');
		this.emitter.emit(newChannelKey);
	}

	ngOnInit() {}
}