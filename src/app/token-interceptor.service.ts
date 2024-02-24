import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userSer: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    var tokenziedReq = req.clone({
      setHeaders: {
        'myauthtoken': this.userSer.getMyAuthToken() ? this.userSer.getMyAuthToken() : ''
      }
    });

    return next.handle(tokenziedReq);
  }
}
