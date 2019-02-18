import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN, NzFormItemComponent } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router'
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NormalComponent } from './layout/normal/normal.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { MasterModule } from './master/master.module'
import { AuthService } from './service/auth.service';
import { AuthHttpService } from './service/auth-http.service';
import { HttpService } from './service/http-service.service';
import { RestServerService } from './service/rest-server.service';
import { UserService } from './service/users.service';
import { CookieService, CookieModule } from 'ngx-cookie';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './service/jwt.interceptor';

registerLocaleData(en);
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    NormalComponent,
    ReportComponent,
    DashboardComponent,
    AskQuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    CookieModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),

    AppRoutingModule,
    MasterModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    NzFormItemComponent,
    AuthService,
    AuthHttpService,
    HttpService,
    RestServerService,
    UserService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule,
  ]
})
export class AppModule { }
