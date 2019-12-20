import { Injectable 	 	 } from '@angular/core';
import { Router 		 	 } from '@angular/router';
import { AngularFireAuth 	 } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable 		 } from 'rxjs';
import { User 				 } from '../models/user.model';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	private user		: Observable<firebase.User>;
	private authState	: any;
	private userId		: string;

	constructor(
		private afAuth	: AngularFireAuth,
		private db		: AngularFireDatabase,
		private router	: Router
	) {
		this.user = afAuth.authState;
	}

	public authUser(){
		return this.user;
	}

	login(email: string, password: string){
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
				.then((firebaseUser) =>{
					if( firebaseUser ){
						this.authState = firebaseUser;
						this.setUserStatus('online');
						this.router.navigate(['chat']);
					}
				});
				// .catch((error) => {
				// 	console.log('[' + error.code + ']:' + error.message);
				// });
	}

	logout(){
		this.setUserStatus('offline');
		this.afAuth.auth.signOut();
	}

	public signUp(email: string, password: string, displayName: string){
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then((ref) => {
					this.authState = ref.user;
					this.setUserData(email, displayName, password, 'online');
				}).catch(error => console.log(error));
	}

	public setUserData(email: string, displayName: string, password: string, status: string): void{
		this.user.pipe().subscribe(
			ref => {
				const path = 'users/' + ref.uid;
				const data = {
					email		: email,
					password    : password,
					displayName	: displayName,
					status		: status
				};
				this.db.object(path).update(data).catch(error => console.log(error));
			}
			
		);
	}

	public setUserStatus(status: string){
		this.user.pipe().subscribe(
			ref => {
				const path = 'users/' + ref.uid;
				const data = {status: status};
				this.db.object(path).update(data).catch(error => console.log(error));
			}
		);
	}
}