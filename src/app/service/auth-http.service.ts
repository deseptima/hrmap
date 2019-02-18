import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthHttpService {

  constructor(private authHttp: HttpClient, private authService: AuthService, private router: Router) { }

  get(endpoint: string) {
    return this.getInternal(endpoint);

  }

  post(endpoint: string, body: string): Observable<any> {
    return this.postInternal(endpoint, body);

  }

  private getInternal(endpoint: string) {
    return this.authHttp.get(endpoint);
  }

  private postInternal(endpoint: string, body: string) {
    return this.authHttp.post(endpoint, body);
  }

}
