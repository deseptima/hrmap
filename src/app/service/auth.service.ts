import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

const authToken: string = 'currentUser';
const company: string = 'currentCompany';
const language: string = 'currentLang';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};
interface Token {
  access_token: string,
  refresh_token: string,
  error: string,
}
interface LoginContext {
  username: string;
  password: string;
}
@Injectable()
export class AuthService {
  redirectUrl: string;
  private csrfToken: any;
  isLoggedIn: Boolean = false;
  private forceChangeSubject = new Subject<boolean>();
  forceChange = this.forceChangeSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService,) { }
  getToken(): Token {
    return JSON.parse(localStorage.getItem(authToken));
  }

  setToken(token: Token): void {
    localStorage.setItem(authToken, JSON.stringify(token));
  }

  login(u: string, p: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
        responseType: 'JSON'
      }),
      withCredentials: true
    };
    const body = `username=${u}&password=${p}`;
    console.log(localStorage.getItem('XSRF-TOKEN'))
    return this.http.post<any>('http://localhost:8080/almn/login', body, httpOptions)
    // .pipe(map((res: Token) => {
    //   console.log('a')
    //   if (res.access_token) {
    //     this.setToken(res);
    //   } else {
    //     // this.as.error("", 'invalid_grant');
    //   }
    // }),
    //   catchError((err) => {
    //     this.isLoggedIn = false;
    //     return of();
    //   })
    // )
    .subscribe(a => {console.log('a') });
  }

  getCsrfToken() {
    return this.http.get<any>('http://localhost:8080/almn/csrf').subscribe((csrf) => {
      if (csrf.delegate) {
        this.csrfToken = csrf.delegate;
      } else {
        this.csrfToken = csrf;
      }
      localStorage.setItem('XSRF-TOKEN', this.csrfToken.token);
      this.cookieService.put('XSRF-TOKEN', this.csrfToken.token);
      localStorage.setItem('csrf_token_header', this.csrfToken.headerName);
      localStorage.setItem('csrf_token', this.csrfToken.token);
    }, (error) => {
      console.log('error: ' + error);
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(authToken);
    localStorage.removeItem(company);
  }

}
