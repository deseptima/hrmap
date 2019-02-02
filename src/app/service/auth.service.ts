import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
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

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, ) { }
  getToken(): Token {
    return JSON.parse(localStorage.getItem(authToken));
  }

  setToken(access, refresh) {
    localStorage.setItem('id_token', access);
    // localStorage.setItem('currentUser', access);
    localStorage.setItem('refresh_token', refresh);
  }

  login(u: string, p: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
        'Authorization': 'Basic aWhyLXdlYjpzNHQyR1JUU0hXR0FSZDd6YlFteDR1SFQ=',
        'csrf_token': localStorage.getItem('csrf_token'),
        responseType: 'JSON'
      }),
      withCredentials: true
    };
    // const headers = new Headers();
    // headers.append('Authorization', `Basic ${http_basic}`);
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('csrf_token', localStorage.getItem('csrf_token'));
    // const body = `username=${u}&password=${p}`;
    let data: string = 'username=' + u + '&password=' + p;
    let body: string = 'username=admin&password=admin'
    // const options = new RequestOptions({ headers: headers, withCredentials: true });
    // return this.http.post<any>('http://localhost:8080/almn/login', body, httpOptions)
    //   .pipe(map((res: Token) => {
    //     console.log(res)
    //     if (res.access_token) {
    //       this.setToken(res);
    //     } else {
    //       // this.as.error("", 'invalid_grant');
    //     }
    //   }),
    //     catchError((err) => {
    //       this.isLoggedIn = false;
    //       return of();
    //     })
    //   )
    //   .subscribe(
    //     res => {
    //       this.isLoggedIn = true;
    //       console.log(res)
    //     }
    //   );
    return this.http.post('http://localhost:8080/almn/login', body, httpOptions).pipe(map(response => {
      const result: any = response
      console.log(response);

      if (result.access_token) {
        this.setToken(result.access_token, result.refresh_token);
        // this.jwt = this.jwtHelper.decodeToken(result.access_token);
        // this.isLoggedIn = true;
        // this.userService.setRole(this.jwt.authorities[0]);
        // this.userService.setUserName(this.jwt.user_name);
        // this.BlockUI.stop();
        // return result;
      } else {
        console.log('Login error, access_token is null')
        // this.BlockUI.stop();
        // throw Observable.throw(result.error_description);
      }
    })).subscribe()
    // .catch(error => {
    //   this.isLoggedIn = false;
    //   console.log('Login error, ', error)
    //   this.BlockUI.stop();
    //   return Observable.throw(error);
    // });
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
    this.isLoggedIn = false;
  }

}
