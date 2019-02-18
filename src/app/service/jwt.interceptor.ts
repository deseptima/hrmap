import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // set Authorization สำหรับเชื่อมต่อกับ backend
    let currentUser = localStorage.getItem('currentUser');
    // console.log(currentUser);
    let auth = 'Bearer '+currentUser
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
          Authorization: auth
        }
      });
    }
    return next.handle(request);
  }
}
