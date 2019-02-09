import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService, ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login() {
    this.authService.login((this.validateForm.controls.userName).toString(), (this.validateForm.controls.password).toString())
    // // this.authService.login('admin','admin')
    // // console.log(localStorage.getItem('currentUser'))

    // this.authService.login(this.validateForm.controls.userName.value, this.validateForm.controls.password.value)
    //   .pipe(finalize(() => {
    //   }))
    //   .subscribe(
    //     data => {
    //       let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
    //       this.router.navigate(["/calendar"]);
    //     });

  }
  ngAfterViewInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl("/calendar")
    } else {
      this.authService.getCsrfToken();
    }
  }
}
