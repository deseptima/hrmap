import { Injectable } from '@angular/core';
// import { AuthHttp } from 'angular2-jwt';
import { AuthHttpService } from './auth-http.service';
import { ResponseContentType } from '@angular/http';
import { UserService } from './users.service';
import { RestServerService } from './rest-server.service';

@Injectable()
export class HttpService {

  constructor(public authHttp: AuthHttpService, private restServer: RestServerService
  , private user: UserService) { }

  public get(pathName: String) {
    return this.authHttp.get(this.restServer.getAPI('', pathName));
  }

  public save(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('jsonString', pathName), JSON.stringify(json));
  }

  public search(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    console.log(json);
    return this.authHttp.post(this.restServer.getAPI('jsonString', pathName), JSON.stringify(json));
  }

  public delete(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('jsonString', pathName), JSON.stringify(json));
  }

  public register(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('register', pathName), JSON.stringify(json));
  }

  public getManageprofile(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('getManageprofile', pathName), JSON.stringify(json));
  }

  public manageprofile(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('manageprofile', pathName), JSON.stringify(json));
  }

  public changepassword(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('changepassword', pathName), JSON.stringify(json));
  }

  public changepasswordByAdmin(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('changepasswordbyadmin', pathName), JSON.stringify(json));
  }

  public forgetpassword(pathName: String, funtionDB: String, args?: Object) {
    const json = this.buildParams(funtionDB, args);
    return this.authHttp.post(this.restServer.getAPI('forgetpassword', pathName), JSON.stringify(json));
  }

  // public onPrint(pathName: String, data: any) {
  //   return this.authHttp.post(this.restServer.getAPI('printReport', pathName), data, { responseType: ResponseContentType.Blob });
  // }

  private buildParams = (funtionDB: String, args?: Object): { method: String; data: object; userName: String } => {
    return {
      method: funtionDB,
      data: args,
      userName: this.user.getUserName()
    };
  }
};
