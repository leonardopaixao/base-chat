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

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router ){
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
	}



	logout(){
		this.setUserStatus('offline');
		this.afAuth.auth.signOut();
	}

	public setAuthState(user){
		this.authState = user;
	}

	public signUp(data:any){
		return this.afAuth.auth.createUserWithEmailAndPassword( data['email'], data['password'] );
		// return this.afAuth.auth.createUserWithEmailAndPassword(data['email'], data['password'])
		// 		.then((ref) => {
		// 			this.authState = ref.user;
		// 			this.setUserData(data['firstName'], data['lastName'], data['email'], data['userName'], data['password'], 'online');
		// 		}).catch(error => { return error });
	}

	public setUserData(firstName: string, lastName: string, email: string, username: string, password: string, status: string): void{
		this.user.pipe().subscribe(
			ref => {
				if(ref){
					const path = 'users/' + ref.uid;
					const data = {
						firstName 	: firstName,
						lastName 	: lastName,
						email		: email,
						password    : password,
						username	: username,
						status		: status
					};
					this.db.object(path).update(data).catch(error => console.log(error));
				}
			}
			
		);
	}

	public setUserStatus(status: string){
		this.user.pipe().subscribe(
			ref => {
				if( ref ){
					const path = 'users/' + ref.uid;
					const data = {status: status};
					this.db.object(path).update(data).catch(error => console.log(error));
				}
			}
		);
	}
}