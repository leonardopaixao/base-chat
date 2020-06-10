import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class OnlyLoggedInUsersGuard implements CanActivate{
    
    private condition: boolean = false;
    
    constructor(private authService: AuthService, private router: Router){ }

    canActivate() {
        if( this.authService.isLoggedIn() === undefined )
            return false
        else
            return true;
    }
}