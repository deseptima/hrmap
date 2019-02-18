import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

let counter = 0;

@Injectable()
export class UserService {

  private _userName = 'admin';
  private _role = '';

  private users = {
    user: { name: 'admin', picture: '', role: '' }
  };

  private userArray: any[];

  constructor() {
    this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    console.log(this.users);

    return of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return of(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return of(this.userArray[counter]);
  }

  getUserName(): string {
    return this._userName;
  }

  setUserName(u: string): string {
    this.users.user.name = u;
    return this._userName = u;
  }

  getRole(): string {
    return this._role;
  }

  setRole(u: string): string {
    this.users.user.role = u;
    return this._role = u;
  }
}
