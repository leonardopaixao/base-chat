import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList  	 } from 'angularfire2/database';
import { AngularFireAuth 	 } from 'angularfire2/auth';
import { Observable 		 } from 'rxjs';
import { Injectable 		 } from '@angular/core';
import { map 				 } from 'rxjs/operators';
import { User 				 } from '../models/user.model';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public db : AngularFireDatabase;
	public basePath : string = '/users';

	constructor( private database: AngularFireDatabase ) {
		this.db = database;
	}

	public findByEmail(email:string){
		return this.db.database.ref('/users').orderByChild('email').equalTo(email).once('value');
	}
}
