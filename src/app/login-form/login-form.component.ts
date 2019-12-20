import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{

  public email: string;
  public password: string;
  public errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    this.authService.login(this.email, this.password).catch((error) => { this.errorMsg = error.message });
  }
}