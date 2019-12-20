import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user : User;
  @Output() emitter : EventEmitter<string> = new EventEmitter();

  public chatService : ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  public openChannel(data){
    const newChannelKey = this.chatService.openChannel(data);
    this.emitter.emit(newChannelKey);
  }

  ngOnInit() {  }
}