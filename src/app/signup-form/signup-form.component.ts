import { Component, OnInit 	} from '@angular/core';
import { Router 			} from '@angular/router';
import { AuthService 		} from '../services/auth.service';

@Component({
  selector	  : 'app-signup-form',
  templateUrl : './signup-form.component.html',
  styleUrls	  : ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{

	public email     : string;
	public password  : string;
	public userName  : string;
	public errorMsg  : string;
	public firstName : string;
	public lastName  : string;
	
	constructor(private authService: AuthService, private router: Router){
		authService.authUser().subscribe( e => {
			if(e){
				if( e.uid )
					router.navigate(['chat']);
			}
		} );
	}

	ngOnInit(){
		this.email = '';
	}

	public signUp(){
		const newUserData = {
			email	  : this.email,
			password  : this.password,
			userName  : this.userName,
			firstName : this.firstName,
			lastName  : this.lastName
		}
		
		this.authService.signUp(newUserData).then(
			ref => {
				if( ref ){
					this.authService.setAuthState(ref.user);
					this.authService.setUserData(
						newUserData['firstName'],
						newUserData['lastName'],
						newUserData['email'],
						newUserData['userName'],
						newUserData['password'],
						'online'
					);
					this.router.navigate(['chat']);
				}
			}
		).catch(error => { this.errorMsg = error.message });
	}
}
