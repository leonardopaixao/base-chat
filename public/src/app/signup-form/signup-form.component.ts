import { Component, OnInit 	} from '@angular/core';
import { Router 			} from '@angular/router';
import { AuthService 		} from '../services/auth.service';

@Component({
  selector	  : 'app-signup-form',
  templateUrl : './signup-form.component.html',
  styleUrls	  : ['./signup-form.component.css']
})
export class SignupFormComponent{

	public email       : string;
	public password    : string;
	public displayName : string;
	public errorMsg    : string;
	
	constructor(private authService: AuthService, private router: Router) { }

	public signUp(){
		const email 	  = this.email;
		const password 	  = this.password;
		const displayName = this.displayName;
		
		this.authService.signUp(email, password, displayName)
			.then(resolve => this.router.navigate(['chat']))
			.catch(error => this.errorMsg = error.message);
	}

}
