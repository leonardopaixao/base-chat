// default modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';
import { FormsModule   } from '@angular/forms';
import { RouterModule  } from '@angular/router';

// angularfire modules
import { AngularFireModule         } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth     } from 'angularfire2/auth';

// components
import { AppRoutingModule    } from './app-routing.module';
import { AppComponent        } from './app.component';
import { ChatFormComponent   } from './chat-form/chat-form.component';
import { ChatroomComponent   } from './chatroom/chatroom.component';
import { FeedComponent       } from './feed/feed.component';
import { MessageComponent    } from './message/message.component';
import { LoginFormComponent  } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent     } from './navbar/navbar.component';
import { UserListComponent   } from './user-list/user-list.component';
import { UserItemComponent   } from './user-item/user-item.component';
import { ChannelListComponent } from './channel-list/channel-list.component';

// appRoutes
import { appRoutes } from '../routes';


// services
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment.prod';
import { ChannelItemComponent } from './channel-item/channel-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    ChannelListComponent,
    ChannelItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
