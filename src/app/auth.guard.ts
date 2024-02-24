import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSer: UsersService, private router: Router) {

  }

  canActivate(): boolean {

    if(!this.userSer.isLoggedUser()) {
      this.router.navigateByUrl("/login");
    }

    return this.userSer.isLoggedUser();

  }
  
}
