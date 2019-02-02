import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
// import { environment } from '../../../environments/environment';

// import * as context from '../interfaces/context-part.interface';

@Injectable()
export class RestServerService {

  constructor(private authService: AuthService, public router: Router) { }

  public getAPI(postFix: string, pathName: String): string {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return 'http://localhost:8080/almn/' + `${pathName}` + '/' + `${postFix}`;
  }
}
