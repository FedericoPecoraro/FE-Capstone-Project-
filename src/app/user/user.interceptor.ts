import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private authSvc:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.authSvc.getAccessToken()

    const newRequest = request.clone({
      headers: request.headers.append('Authorization', 'Bearer ' + accessToken)
    })

    return next.handle(newRequest);

  }
}
