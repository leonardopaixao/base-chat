import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public user      : Observable<firebase.User>;
	public userEmail : string;
	public errorMsg  : string;
	public username  : string;
	public userData	 : any;

  	constructor(private authService: AuthService, private userService: UserService) { }

	logout(){
		this.authService.logout();
	}

	ngOnInit() {
		this.user = this.authService.authUser();

		this.user.subscribe(
			user => {
				if(user){
					this.userEmail = user.email;

					this.userService.findByEmail(this.userEmail).then(
						ref => {
							const data = Object.keys(ref.val()).map(key => ({key: key, value: ref.val()[key]}));
							this.username = data[0].value['displayName'];
						}
					);
				}
			}
		);
	}
}